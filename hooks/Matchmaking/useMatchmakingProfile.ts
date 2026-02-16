import { useAPI } from '@/contexts/API'

type Props = {
  enabled?: boolean
}

export const useMatchmakingProfile = (props?: Props) => {
  return useAPI().useQuery(['matchmakingProfileGet', null], {
    enabled: props?.enabled ?? true,
    retry: false,
    refetchInterval: 30000,
  })
}
