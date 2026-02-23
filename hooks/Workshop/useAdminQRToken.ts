import { useAPI } from '@/contexts/API'

// Polls every 25s to keep QR fresh before the 30s window expires.
export const useAdminQRToken = (eventId: number | null) => {
  return useAPI().useQuery(['adminQRTokenGet', { id: eventId as number }], {
    enabled: eventId !== null,
    refetchInterval: 570_000, // 9m30s — refresh before the 10-minute bucket expires
    staleTime: 0,
  })
}
