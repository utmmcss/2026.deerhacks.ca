import { useMemo, useState } from 'react'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import Modal from '@/components/Dashboard/Modal'
import { useEmailSend } from '@/hooks/Email/useEmailSend'
import { UserListData } from '@/types/User'

import EmailPreview from './EmailPreview'
import { AVAILABLE_VARIABLES } from './emailTemplate'

type Props = {
  open: boolean
  onClose: () => void
  selectedUsers: UserListData[]
  allSelectedIds?: string[]
}

type SendState =
  | { status: 'idle' }
  | { status: 'confirm' }
  | { status: 'sending' }
  | { status: 'complete'; success: number; failed: Array<{ email: string; error: string }> }

const EmailModal = ({ open, onClose, selectedUsers, allSelectedIds }: Props) => {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sendState, setSendState] = useState<SendState>({ status: 'idle' })

  const recipientIds = allSelectedIds ?? selectedUsers.map((u) => u.discord_id)
  const recipientCount = recipientIds.length

  const { mutate: sendEmail, isLoading } = useEmailSend()

  const sampleUser = useMemo(() => {
    if (selectedUsers.length > 0) {
      const user = selectedUsers[0]
      return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        status: user.status,
      }
    }
    return {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      status: 'applied',
    }
  }, [selectedUsers])

  const handleClose = () => {
    if (isLoading) return
    setSubject('')
    setBody('')
    setSendState({ status: 'idle' })
    onClose()
  }

  const handleSend = () => {
    if (sendState.status === 'idle') {
      setSendState({ status: 'confirm' })
      return
    }

    if (sendState.status === 'confirm') {
      setSendState({ status: 'sending' })
      sendEmail(
        {
          userIds: recipientIds,
          subject,
          body,
        },
        {
          onSuccess: (data) => {
            setSendState({ status: 'complete', success: data.success, failed: data.failed })
          },
          onError: () => {
            setSendState({ status: 'idle' })
          },
        }
      )
    }
  }

  const canSend = subject.trim().length > 0 && body.trim().length > 0 && recipientCount > 0

  const getPrimaryButton = () => {
    switch (sendState.status) {
      case 'idle':
        return {
          text: 'Send Email',
          onClick: handleSend,
          disabled: !canSend,
        }
      case 'confirm':
        return {
          text: `Send to ${recipientCount} users`,
          onClick: handleSend,
        }
      case 'sending':
        return {
          text: 'Sending...',
          onClick: () => {},
          loading: true,
          disabled: true,
        }
      case 'complete':
        return {
          text: 'Close',
          onClick: handleClose,
        }
    }
  }

  const getSecondaryButton = () => {
    if (sendState.status === 'confirm') {
      return {
        text: 'Cancel',
        onClick: () => setSendState({ status: 'idle' }),
      }
    }
    if (sendState.status === 'complete') {
      return undefined
    }
    return {
      text: 'Cancel',
      onClick: handleClose,
    }
  }

  return (
    <Modal
      open={open}
      title="Send Email"
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      primaryButton={getPrimaryButton()}
      secondaryButton={getSecondaryButton()}
    >
      {sendState.status === 'complete' ? (
        <Box component="div" sx={{ py: 2 }}>
          <Alert severity={sendState.failed.length === 0 ? 'success' : 'warning'} sx={{ mb: 2 }}>
            Successfully sent to {sendState.success} users
            {sendState.failed.length > 0 && `, ${sendState.failed.length} failed`}
          </Alert>
          {sendState.failed.length > 0 && (
            <Box component="div">
              <Typography variant="subtitle2" gutterBottom>
                Failed recipients:
              </Typography>
              {sendState.failed.map((f, i) => (
                <Typography key={i} variant="body2" color="error">
                  • {f.email} - {f.error}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Collapse in={sendState.status === 'confirm'}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              You are about to send this email to <strong>{recipientCount}</strong> users.
              This action cannot be undone.
            </Alert>
          </Collapse>

          <Box
            component="div"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
              minHeight: 400,
            }}
          >
            <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Compose Email ({recipientCount} recipients)
              </Typography>

              <TextField
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                disabled={sendState.status !== 'idle'}
                placeholder="e.g., {{first_name}}, important update about DeerHacks"
              />

              <TextField
                label="Body (HTML)"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                fullWidth
                multiline
                rows={12}
                disabled={sendState.status !== 'idle'}
                placeholder="<p>Hi {{first_name}},</p><p>Your email content here...</p>"
                InputProps={{
                  sx: { fontFamily: 'monospace', fontSize: '0.875rem' },
                }}
              />

              <Box component="div" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                  Variables:
                </Typography>
                {AVAILABLE_VARIABLES.map((v) => (
                  <Chip
                    key={v.key}
                    label={v.key}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      navigator.clipboard.writeText(v.key)
                    }}
                    title={v.description}
                  />
                ))}
              </Box>
            </Box>

            <EmailPreview subject={subject} body={body} sampleUser={sampleUser} />
          </Box>
        </>
      )}
    </Modal>
  )
}

export default EmailModal
