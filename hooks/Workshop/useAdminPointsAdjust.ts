import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useAdminPointsAdjust = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('adminPointsAdjust', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to adjust points.'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Points adjusted successfully' })
    },
  })
}
