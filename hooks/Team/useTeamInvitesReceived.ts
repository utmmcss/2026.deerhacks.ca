import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
}

export const useTeamInvitesReceived = (props?: Props) => {
  return useAPI().useQuery(['teamsInvitesReceivedList', null], {
    enabled: props?.enabled ?? true,
    retry: false,
    refetchInterval: props?.enabled ? 30000 : false,
    refetchIntervalInBackground: false,
  })
}
