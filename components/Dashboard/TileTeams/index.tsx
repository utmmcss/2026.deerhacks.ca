import NextLink from 'next/link'

import GroupsIcon from '@mui/icons-material/Groups'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import { useTeamGet } from '@/hooks/Team'
import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileTeams = (props: Props) => {
  const { status } = props

  // Only show for accepted users
  const isAccepted = ['accepted', 'attended', 'admin', 'moderator'].includes(status)

  const { data, isLoading } = useTeamGet({ enabled: isAccepted })
  const team = data?.team
  const hasTeam = !!team

  if (!isAccepted) {
    return null
  }

  return (
    <Card
      variant={hasTeam ? 'elevation' : 'outlined'}
      elevation={hasTeam ? 5 : 0}
      sx={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: hasTeam
          ? 'radial-gradient(circle at 70% 30%, rgba(129, 199, 132, 0.15), transparent 50%), rgba(30, 30, 35, 0.7)'
          : undefined,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <CardActionArea href="/dashboard/teams" LinkComponent={NextLink}>
        <CardContent>
          <Typography
            variant="h1"
            display="flex"
            alignItems="center"
            textAlign="left"
            gap="0.5rem"
            gutterBottom
            color="text.primary"
            sx={{ transition: 'all 0.2s ease' }}
          >
            <GroupsIcon color="success" fontSize="inherit" />
            Teams
          </Typography>

          {isLoading ? (
            <CircularProgress size="1.5rem" />
          ) : team ? (
            <Chip
              label={`${team.name} (${team.members.filter((m) => m.state === 'joined').length} members)`}
              color="success"
              size="small"
            />
          ) : (
            <Typography variant="body2">Find or create a team for the hackathon</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileTeams
