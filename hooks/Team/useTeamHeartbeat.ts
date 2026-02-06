import { useAPI } from '@/contexts/API'

export const useTeamHeartbeat = () => {
  return useAPI().useMutation('teamsHeartbeat')
}
