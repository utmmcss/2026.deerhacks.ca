import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useAdminEventCreate = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('adminEventCreate', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to create event. Please try again.'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Event created successfully' })
      api.queryClient.invalidateQueries({ queryKey: ['adminEventList'] })
      api.queryClient.invalidateQueries({ queryKey: ['eventList'] })
    },
  })
}
