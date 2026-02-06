import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamRequestJoin = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsRequestJoin', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to request to join'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Join request submitted' })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
      api.queryClient.invalidateQueries({ queryKey: ['teamsList'] })
    },
  })
}
