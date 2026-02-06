import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamDisband = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsDisband', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to disband team'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Team disbanded' })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
      api.queryClient.invalidateQueries({ queryKey: ['teamsList'] })
    },
  })
}
