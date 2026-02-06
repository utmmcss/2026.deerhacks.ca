import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamLeave = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsLeave', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to leave team'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Left team successfully' })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
      api.queryClient.invalidateQueries({ queryKey: ['teamsList'] })
    },
  })
}
