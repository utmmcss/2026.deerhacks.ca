import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

export const useTeamGet = (props?: Props) => {
  return useAPI().useQuery(['teamMineGet', null], {
    enabled: props?.enabled,
    retry: false,
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}
