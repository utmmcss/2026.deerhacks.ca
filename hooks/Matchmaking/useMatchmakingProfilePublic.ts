import { useAPI } from '@/contexts/API'

type Props = {
  userId: number | null
  enabled?: boolean
}

export const useMatchmakingProfilePublic = (props: Props) => {
  return useAPI().useQuery(['matchmakingProfilePublicGet', { userId: props.userId ?? 0 }], {
    enabled: (props.enabled ?? true) && props.userId !== null,
    retry: false,
  })
}
