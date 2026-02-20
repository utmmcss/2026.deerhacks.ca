import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamInviteSend = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsInviteSend', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to send invite'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Invite sent!' })
    },
  })
}
