import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
}

export const useAvailableUsers = (props?: Props) => {
  return useAPI().useQuery(['teamsAvailableUsersList', null], {
    enabled: props?.enabled ?? true,
    retry: false,
  })
}
