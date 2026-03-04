import { useAPI } from '@/contexts/API'

// Token is a static HMAC(QR_SECRET, eventID) — it never changes for a given event.
// staleTime: Infinity prevents background refetches; the query re-fires automatically
// when the event selection changes (key change) or on event update (invalidateQueries).
export const useAdminQRToken = (eventId: number | null) => {
  return useAPI().useQuery(['adminQRTokenGet', { id: eventId as number }], {
    enabled: eventId !== null,
    staleTime: Infinity,
  })
}
