import { useEffect, useState } from 'react'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Modal from '@/components/Dashboard/Modal'
import { useMatchmakingProfilePublic } from '@/hooks/Matchmaking'
import { useTeamInviteSend } from '@/hooks/Team'
import { MATCHMAKING_PROJECT_PREFS,MATCHMAKING_ROLES } from '@/types/Matchmaking'
import type { AvailableUser, TeamMember } from '@/types/Team'

/** Generate a consistent color from a string (matches TeamsPage utility) */
const stringToColor = (str: string) => {
  const colors = [
    '#5d99c6', '#66bb6a', '#ffa726', '#ef5350',
    '#ab47bc', '#26c6da', '#ec407a', '#7e57c2',
    '#42a5f5', '#26a69a', '#d4e157', '#ff7043',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

type AvailableUserSubject = {
  kind: 'available'
  user: AvailableUser
  canInvite: boolean
}

type TeamMemberSubject = {
  kind: 'teammate'
  member: TeamMember
  isOwnerViewing: boolean
  onRemove: (userId: number) => void
  onTransfer: (userId: number) => void
  isRemoving: boolean
  isTransferring: boolean
}

type Props = {
  open: boolean
  onClose: () => void
  subject: AvailableUserSubject | TeamMemberSubject | null
}

const UserProfileModal = ({ open, onClose, subject }: Props) => {
  const [invitedUserId, setInvitedUserId] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const userId =
    subject?.kind === 'available'
      ? subject.user.user_id
      : subject?.kind === 'teammate'
      ? subject.member.user_id
      : null

  const { data: publicProfileData, isLoading: profileLoading } = useMatchmakingProfilePublic({
    userId,
    enabled: open && userId !== null,
  })

  const { mutate: sendInvite, isLoading: isSending } = useTeamInviteSend()
  const inviteSent = userId !== null && invitedUserId === userId

  const publicProfile = publicProfileData?.profile

  const firstName =
    subject?.kind === 'available'
      ? subject.user.first_name
      : subject?.kind === 'teammate'
      ? subject.member.first_name
      : ''

  const lastName =
    subject?.kind === 'available'
      ? subject.user.last_name
      : subject?.kind === 'teammate'
      ? subject.member.last_name
      : ''

  const username =
    subject?.kind === 'available'
      ? subject.user.username
      : subject?.kind === 'teammate'
      ? subject.member.username
      : ''

  const discordId = subject?.kind === 'available' ? subject.user.discord_id : undefined
  const school = subject?.kind === 'available' ? subject.user.school : undefined
  const program = subject?.kind === 'available' ? subject.user.program : undefined
  const interests = subject?.kind === 'available' ? subject.user.interests : []

  const fullName = `${firstName} ${lastName}`.trim()
  const avatarColor = stringToColor(`${firstName}${lastName}`)
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`

  const roleLabel = publicProfile?.role
    ? MATCHMAKING_ROLES.find((r) => r.value === publicProfile.role)?.label ?? publicProfile.role
    : null

  const projectLabel = publicProfile?.project_preference
    ? MATCHMAKING_PROJECT_PREFS.find((p) => p.value === publicProfile.project_preference)?.label ??
      publicProfile.project_preference
    : null

  const handleCopyDiscord = () => {
    if (!discordId) return
    navigator.clipboard.writeText(discordId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendInvite = () => {
    if (!userId) return
    sendInvite(
      { data: { user_id: userId } },
      { onSuccess: () => setInvitedUserId(userId) }
    )
  }

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    if (!open) {
      setInvitedUserId(null)
      setCopied(false)
    }
  }, [open])

  const primaryButton =
    subject?.kind === 'available' && subject.canInvite
      ? {
          text: inviteSent ? 'Invite Sent' : 'Send Invite',
          onClick: handleSendInvite,
          loading: isSending,
          disabled: inviteSent || isSending,
          color: 'success' as const,
        }
      : subject?.kind === 'teammate' && subject.isOwnerViewing && !subject.member.is_owner
      ? {
          text: 'Make Owner',
          onClick: () => {
            subject.onTransfer(subject.member.user_id)
            handleClose()
          },
          loading: subject.isTransferring,
        }
      : undefined

  const secondaryButton =
    subject?.kind === 'teammate' && subject.isOwnerViewing && !subject.member.is_owner
      ? {
          text: 'Remove Member',
          onClick: () => {
            subject.onRemove(subject.member.user_id)
            handleClose()
          },
          loading: subject.isRemoving,
          color: 'error' as const,
        }
      : undefined

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              bgcolor: avatarColor,
              width: 36,
              height: 36,
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {initials}
          </Avatar>
          <Box component="div">
            <Typography
              variant="subtitle1"
              sx={{ color: '#fff', fontWeight: 600, lineHeight: 1.2 }}
            >
              {fullName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              @{username}
            </Typography>
          </Box>
        </Stack>
      }
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    >
      <Stack spacing={2}>
        {/* Discord ID */}
        {discordId && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="body2"
              sx={{ color: '#5865F2', fontFamily: 'monospace', fontSize: '0.85rem', flex: 1 }}
            >
              {discordId}
            </Typography>
            <Tooltip title={copied ? 'Copied!' : 'Copy Discord'}>
              <IconButton
                size="small"
                onClick={handleCopyDiscord}
                sx={{ color: 'text.secondary' }}
              >
                <ContentCopyIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        )}

        {/* School & Program */}
        {(school || program) && (
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}
          >
            {[school, program].filter(Boolean).join(' · ')}
          </Typography>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <Box component="div">
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block', mb: 0.75 }}
            >
              Interests
            </Typography>
            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5}>
              {interests.map((interest) => (
                <Chip
                  key={interest}
                  label={interest}
                  size="small"
                  sx={{ height: 22, fontSize: '0.7rem' }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Matchmaking profile */}
        {profileLoading ? (
          <Box component="div" display="flex" justifyContent="center" py={1}>
            <CircularProgress size={20} />
          </Box>
        ) : roleLabel || projectLabel || (publicProfile?.interests?.length ?? 0) > 0 ? (
          <>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            <Box component="div">
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', display: 'block', mb: 0.75 }}
              >
                Hackathon Profile
              </Typography>
              <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75}>
                {roleLabel && (
                  <Chip
                    label={roleLabel}
                    size="small"
                    color="primary"
                    sx={{ height: 24, fontSize: '0.75rem' }}
                  />
                )}
                {projectLabel && (
                  <Chip
                    label={projectLabel}
                    size="small"
                    color="secondary"
                    sx={{ height: 24, fontSize: '0.75rem' }}
                  />
                )}
                {publicProfile?.interests?.map((i) => (
                  <Chip key={i} label={i} size="small" sx={{ height: 24, fontSize: '0.75rem' }} />
                ))}
              </Stack>
            </Box>
          </>
        ) : null}
      </Stack>
    </Modal>
  )
}

export default UserProfileModal
