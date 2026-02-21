import { useAPI } from '@/contexts/API'

// Polls every 5s for the live "last 5 claimants" feed.
export const useAdminEventRedemptions = (eventId: number | null) => {
  return useAPI().useQuery(['adminEventRedemptions', { id: eventId as number }], {
    enabled: eventId !== null,
    refetchInterval: 5_000,
    staleTime: 0,
  })
}
