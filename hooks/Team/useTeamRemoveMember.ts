import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamRemoveMember = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsRemoveMember', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to remove member'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Member removed' })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
      api.queryClient.invalidateQueries({ queryKey: ['teamsAvailableUsersList'] })
    },
  })
}
