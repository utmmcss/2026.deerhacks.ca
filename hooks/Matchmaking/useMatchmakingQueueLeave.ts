import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useMatchmakingQueueLeave = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('matchmakingQueueLeave', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to leave matchmaking queue'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Left matchmaking queue' })
      api.queryClient.invalidateQueries({ queryKey: ['matchmakingProfileGet'] })
    },
  })
}
