import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamRespondJoin = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsRespondJoin', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to respond to join request'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Request updated' })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
      api.queryClient.invalidateQueries({ queryKey: ['teamsList'] })
    },
  })
}
