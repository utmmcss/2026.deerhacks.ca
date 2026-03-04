import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useUserListIds = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('userListIds', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Too many recipients — refine your filters to under 500'),
      })
    },
  })
}
