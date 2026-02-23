import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useWorkshopClaim = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('workshopClaim', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to claim points. Please try again.'),
      })
    },
  })
}
