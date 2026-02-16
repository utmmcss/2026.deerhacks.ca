import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useMatchmakingUpsert = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('matchmakingProfileUpsert', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to save matchmaking profile'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Matchmaking profile saved' })
      api.queryClient.invalidateQueries({ queryKey: ['matchmakingProfileGet'] })
    },
  })
}
