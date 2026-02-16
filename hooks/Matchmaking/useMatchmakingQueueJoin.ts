import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useMatchmakingQueueJoin = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('matchmakingQueueJoin', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to join matchmaking queue'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Joined matchmaking queue' })
      api.queryClient.invalidateQueries({ queryKey: ['matchmakingProfileGet'] })
    },
  })
}
