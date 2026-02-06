import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamTransfer = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsTransfer', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to transfer ownership'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Ownership transferred' })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
    },
  })
}
