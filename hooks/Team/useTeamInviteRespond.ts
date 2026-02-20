import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamInviteRespond = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsInviteRespond', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to respond to invite'),
      })
    },
    onSuccess: () => {
      api.queryClient.invalidateQueries({ queryKey: ['teamsInvitesReceivedList'] })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
    },
  })
}
