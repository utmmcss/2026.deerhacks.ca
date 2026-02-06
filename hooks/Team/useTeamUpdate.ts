import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamUpdate = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsUpdate', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to update team'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Team updated successfully' })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
      api.queryClient.invalidateQueries({ queryKey: ['teamsList'] })
    },
  })
}
