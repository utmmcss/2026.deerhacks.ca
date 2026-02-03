import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useAdminSettingsUpdate = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('adminSettingsUpdate', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to update setting. Please try again.'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Setting updated successfully' })
      api.queryClient.invalidateQueries({ queryKey: ['adminSettingsGet'] })
      api.queryClient.invalidateQueries({ queryKey: ['settingsGet'] })
    },
  })
}
