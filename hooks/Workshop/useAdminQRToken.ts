import { useAPI } from '@/contexts/API'

// Polls every 25s to keep QR fresh before the 30s window expires.
export const useAdminQRToken = (eventId: number | null) => {
  return useAPI().useQuery(['adminQRToken', { id: eventId as number }], {
    enabled: eventId !== null,
    refetchInterval: 25_000,
    staleTime: 0,
  })
}
