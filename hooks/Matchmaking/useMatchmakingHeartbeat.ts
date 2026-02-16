import { useAPI } from '@/contexts/API'

export const useMatchmakingHeartbeat = () => {
  return useAPI().useMutation('matchmakingHeartbeat')
}
