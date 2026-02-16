import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useMatchmakingRematch = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('matchmakingRematch', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to rematch'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Re-entered matchmaking queue' })
      api.queryClient.invalidateQueries({ queryKey: ['matchmakingProfileGet'] })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
    },
  })
}
