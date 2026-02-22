import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useAdminEventUpdate = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('adminEventUpdate', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to update event. Please try again.'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Event updated successfully' })
      api.queryClient.invalidateQueries({ queryKey: ['adminEventList'] })
      api.queryClient.invalidateQueries({ queryKey: ['eventList'] })
      api.queryClient.invalidateQueries({ queryKey: ['adminQRTokenGet'] })
    },
  })
}
