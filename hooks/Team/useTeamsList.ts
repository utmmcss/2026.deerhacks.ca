import { useAPI } from '@/contexts/API'

type Props = {
  sort?: string
  openSpots?: boolean
  enabled?: boolean
}

export const useTeamsList = (props?: Props) => {
  return useAPI().useQuery(
    ['teamsList', { sort: props?.sort, open_spots: props?.openSpots }],
    {
      enabled: props?.enabled ?? true,
      retry: false,
    }
  )
}
