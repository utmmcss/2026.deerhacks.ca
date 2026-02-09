import { useEffect, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

import CelestialLayout from '@/components/Celestial/CelestialLayout'
import ScheduleGrid from '@/components/Shared/ScheduleGrid'
import { useEventList } from '@/hooks/Event/useEventList'
import { useSettings } from '@/hooks/Settings/useSettings'

const SchedulePage = () => {
  const { data: settingsData, isLoading: settingsLoading, isError: settingsError } = useSettings({
    enabled: true,
  })
  const scheduleVisible =
    settingsData?.settings.find((setting) => setting.key === 'schedule_visible')?.value === 'true'

  const { data, isLoading: eventsLoading, isError: eventsError } = useEventList({
    enabled: !!scheduleVisible,
  })

  const parsedData = useMemo(() => data?.parsedData ?? {}, [data?.parsedData])
  const days = useMemo(
    () =>
      Object.keys(parsedData).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      ),
    [parsedData]
  )

  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  useEffect(() => {
    if (days.length === 0) {
      setSelectedDay(null)
      return
    }
    if (!selectedDay || !days.includes(selectedDay)) {
      setSelectedDay(days[0])
    }
  }, [days, selectedDay])

  const formatDayLabel = (day: string) =>
    new Date(day).toLocaleDateString('en-CA', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })

  return (
    <CelestialLayout title="Schedule" showFooter={false}>
      <Container maxWidth="lg">
        <Box component="div" display="flex" flexDirection="column" gap={4} py={2}>
          <Typography variant="h1">Schedule</Typography>

          {settingsLoading ? (
            <Box component="div" display="flex" justifyContent="center" py={8}>
              <CircularProgress />
            </Box>
          ) : settingsError ? (
            <Box component="div" textAlign="center" py={8}>
              <Typography variant="body1">Failed to load schedule visibility.</Typography>
            </Box>
          ) : !scheduleVisible ? (
            <Box component="div" textAlign="center" py={8}>
              <Typography variant="h3" gutterBottom>
                Schedule Coming Soon
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The DeerHacks schedule isn&apos;t ready yet. Check back closer to the event for the
                full lineup of workshops, activities, and announcements.
              </Typography>
            </Box>
          ) : eventsError ? (
            <Box component="div" textAlign="center" py={8}>
              <Typography variant="body1">Failed to load schedule events.</Typography>
            </Box>
          ) : eventsLoading ? (
            <Box component="div" display="flex" justifyContent="center" py={8}>
              <CircularProgress />
            </Box>
          ) : days.length === 0 ? (
            <Box component="div" textAlign="center" py={8}>
              <Typography variant="body1" color="text.secondary">
                No events scheduled yet. Check back soon.
              </Typography>
            </Box>
          ) : (
            <>
              <Tabs
                value={selectedDay ?? false}
                onChange={(_, value) => setSelectedDay(value)}
                variant="scrollable"
                scrollButtons="auto"
              >
                {days.map((day) => (
                  <Tab key={day} label={formatDayLabel(day)} value={day} />
                ))}
              </Tabs>
              {selectedDay && (
                <Box component="div" sx={{ overflowX: 'auto' }}>
                  <Box component="div" sx={{ minWidth: 720 }}>
                    <ScheduleGrid {...parsedData[selectedDay]} />
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </CelestialLayout>
  )
}

export default SchedulePage
