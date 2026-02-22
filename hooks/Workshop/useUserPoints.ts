import { useAPI } from '@/contexts/API'

export const useUserPoints = (props?: { enabled?: boolean; discordId?: string }) => {
  const args = props?.discordId ? { discord_id: props.discordId } : undefined

  return useAPI().useQuery(['userPointsGet', args ?? null], {
    enabled: props?.enabled,
    staleTime: 30_000,
  })
}
