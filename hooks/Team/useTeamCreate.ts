import { useAPI } from '@/contexts/API'
import { useToast } from '@/contexts/Toast'
import { getApiErrorMessage } from '@/utils/apiErrors'

export const useTeamCreate = () => {
  const api = useAPI()
  const { setToast } = useToast()

  return api.useMutation('teamsCreate', {
    onError: (err) => {
      setToast({
        type: 'error',
        message: getApiErrorMessage(err, 'Failed to create team'),
      })
    },
    onSuccess: () => {
      setToast({ type: 'success', message: 'Team created successfully' })
      api.queryClient.invalidateQueries({ queryKey: ['teamMineGet'] })
      api.queryClient.invalidateQueries({ queryKey: ['teamsList'] })
    },
  })
}
