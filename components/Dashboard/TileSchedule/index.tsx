import NextLink from 'next/link'

import GrainIcon from '@mui/icons-material/Grain'
import SettingsIcon from '@mui/icons-material/Settings'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'

import { useEventList } from '@/hooks/Event/useEventList'
import { useSettings } from '@/hooks/Settings/useSettings'
import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileSchedule = (props: Props) => {
  const { status } = props

  const isAdmin = status === 'admin'
  const { data: settingsData, isLoading: settingsLoading } = useSettings({ enabled: true })
  const scheduleVisible =
    settingsData?.settings.find((s) => s.key === 'schedule_visible')?.value === 'true'
  const shouldFetchEvents = isAdmin || scheduleVisible

  const { data, isLoading, isError } = useEventList({ enabled: shouldFetchEvents })

  const hasEvents = !isLoading && (data?.data?.length ?? 0) > 0 && scheduleVisible
  const now = new Date()
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const upcomingEvents = data?.data?.filter((event) => {
    const eventDate = new Date(event.attributes.startTime)
    const nowPlusFiveMinutes = new Date(now.getTime() + 5 * 60 * 1000)
    return nowPlusFiveMinutes <= eventDate
  })

  // Admin view - always show, link to management page
  if (isAdmin) {
    return (
      <Card
        variant="elevation"
        elevation={5}
        sx={{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background:
            'radial-gradient(circle at 70% 30%, rgba(144, 202, 249, 0.15), transparent 50%), rgba(30, 30, 35, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <CardActionArea href="/dashboard/schedule" LinkComponent={NextLink}>
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
              <SettingsIcon color="info" fontSize="inherit" />
              Manage Schedule
            </Typography>
            <Box component="div" display="flex" alignItems="center" gap={1}>
              {settingsLoading ? (
                <Chip label="Loading visibility..." size="small" />
              ) : !scheduleVisible ? (
                <Chip
                  icon={<VisibilityOffIcon />}
                  label="Hidden from users"
                  color="warning"
                  size="small"
                />
              ) : (
                <Chip
                  icon={<VisibilityIcon />}
                  label="Visible to users"
                  color="success"
                  size="small"
                />
              )}
              <Typography variant="body2" color="text.secondary">
                • {data?.data?.length ?? 0} events
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  // Non-admin: hidden schedule
  if (!scheduleVisible || isError || (!hasEvents && !isLoading)) {
    return (
      <Card variant="outlined" elevation={0}>
        <CardActionArea disabled>
          <CardContent>
            <Typography
              variant="h1"
              display="flex"
              alignItems="center"
              textAlign="left"
              gap="0.5rem"
              gutterBottom
              color="text.disabled"
            >
              <GrainIcon color="info" fontSize="inherit" />
              Schedule
            </Typography>
            <Typography variant="body2">Coming Soon</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  // Non-admin: visible schedule with events
  return (
    <Card
      variant={hasEvents ? 'elevation' : 'outlined'}
      elevation={hasEvents ? 5 : 0}
      sx={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: hasEvents
          ? 'radial-gradient(circle at 70% 30%, rgba(144, 202, 249, 0.15), transparent 50%), rgba(30, 30, 35, 0.7)'
          : undefined,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <CardActionArea href="/schedule" LinkComponent={NextLink} disabled={!hasEvents}>
        <CardContent>
          <Typography
            variant="h1"
            display="flex"
            alignItems="center"
            textAlign="left"
            gap="0.5rem"
            gutterBottom
            color={hasEvents ? 'text.primary' : 'text.disabled'}
            sx={{ transition: 'all 0.2s ease' }}
          >
            <GrainIcon color="info" fontSize="inherit" />
            Schedule
          </Typography>

          <>
            <Collapse in={!isLoading && upcomingEvents?.length !== 0} timeout={500}>
              <Box component="div" display="flex" flexDirection="column" gap="1rem">
                <Typography variant="h3">Up Next:</Typography>
                <Box component="div" display="flex" flexDirection="column" gap="0.5rem">
                  {upcomingEvents?.slice(0, 3).map((event) => {
                    const eventDate = new Date(event?.attributes?.startTime)

                    const configs: Intl.DateTimeFormatOptions =
                      eventDate > oneWeekFromNow
                        ? {
                            timeZone: 'America/Toronto',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          }
                        : {
                            timeZone: 'America/Toronto',
                            weekday: 'short',
                            hour: 'numeric',
                            minute: 'numeric',
                          }

                    return (
                      <Chip
                        key={event?.id}
                        color={event?.attributes?.important ? 'primary' : 'default'}
                        label={`${eventDate.toLocaleString('en', configs)} / ${
                          event?.attributes?.title
                        } / ${event?.attributes?.location}`}
                        sx={{ width: 'fit-content', color: 'lightgray' }}
                      />
                    )
                  })}
                </Box>
              </Box>
            </Collapse>
            {!isLoading && upcomingEvents?.length === 0 && (
              <Typography variant="body2">Explore DeerHacks events, workshops & more</Typography>
            )}
            {isLoading && <CircularProgress size="1.5rem" />}
          </>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileSchedule
