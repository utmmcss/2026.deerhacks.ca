import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useAdminEventDelete = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('adminEventDelete', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to delete event. Please try again.'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Event deleted successfully' })
      api.queryClient.invalidateQueries({ queryKey: ['adminEventList'] })
      api.queryClient.invalidateQueries({ queryKey: ['eventList'] })
    },
  })
}
