import Head from 'next/head'
import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import FormControlLabel from '@mui/material/FormControlLabel'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

import ScheduleEventCard from '@/components/Dashboard/ScheduleEventCard'
import BackButton from '@/components/Shared/BackButton'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import { useAdminEventCreate } from '@/hooks/Admin/useAdminEventCreate'
import { useAdminEventDelete } from '@/hooks/Admin/useAdminEventDelete'
import { useAdminEventList } from '@/hooks/Admin/useAdminEventList'
import { useAdminEventUpdate } from '@/hooks/Admin/useAdminEventUpdate'
import { useAdminSettings } from '@/hooks/Admin/useAdminSettings'
import { useAdminSettingsUpdate } from '@/hooks/Admin/useAdminSettingsUpdate'
import Error404Page from '@/pages/404'
import Error500Page from '@/pages/500'
import { EventCreateReq } from '@/types/Admin'

const ScheduleManagement = () => {
  const { user, loading, authenticated } = useAuth()
  const isAdmin = user?.status === 'admin'

  const [showNewEvent, setShowNewEvent] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 8

  const {
    data: eventsData,
    isLoading: eventsLoading,
    isError: eventsError,
  } = useAdminEventList({ enabled: isAdmin })

  const {
    data: settingsData,
    isLoading: settingsLoading,
    isError: settingsError,
  } = useAdminSettings({ enabled: isAdmin })

  const { mutate: createEvent, isLoading: isCreating } = useAdminEventCreate()
  const { mutate: updateEvent, isLoading: isUpdating } = useAdminEventUpdate()
  const { mutate: deleteEvent, isLoading: isDeleting } = useAdminEventDelete()
  const { mutate: updateSetting, isLoading: isTogglingVisibility } = useAdminSettingsUpdate()

  const scheduleVisible =
    settingsData?.settings.find((s) => s.key === 'schedule_visible')?.value === 'true'
  const settingsReady = !settingsLoading && !!settingsData

  const handleToggleVisibility = () => {
    updateSetting({
      key: 'schedule_visible',
      data: { value: scheduleVisible ? 'false' : 'true' },
    })
  }

  const handleCreateEvent = (data: EventCreateReq) => {
    createEvent(data, {
      onSuccess: () => setShowNewEvent(false),
    })
  }

  const handleUpdateEvent = (id: number, data: EventCreateReq) => {
    updateEvent({ id, data })
  }

  const handleDeleteEvent = (id: number) => {
    deleteEvent({ id })
  }

  const events = eventsData?.data ?? []
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.attributes.startTime).getTime() - new Date(b.attributes.startTime).getTime()
  )
  const totalPages = Math.max(1, Math.ceil(sortedEvents.length / pageSize))
  const pagedEvents = sortedEvents.slice((page - 1) * pageSize, page * pageSize)

  if (!loading && !isAdmin) {
    return <Error404Page />
  }

  if (eventsError || settingsError) {
    return <Error500Page />
  }

  return (
    <>
      <Head>
        <title>Schedule Management | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container
            maxWidth="lg"
            sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'start', py: 4 }}
          >
            <BackButton navbar text="Dashboard" href="/dashboard" />
            <Typography variant="h1" gutterBottom>
              Schedule Management
            </Typography>

              {/* Header Controls */}
              <Box
                component="div"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
                flexWrap="wrap"
                gap={2}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(scheduleVisible)}
                      onChange={handleToggleVisibility}
                      disabled={!settingsReady || isTogglingVisibility}
                    />
                  }
                  label={
                    <Box component="span" display="flex" alignItems="center" gap={1}>
                      {settingsLoading ? (
                        <>
                          <VisibilityOffIcon fontSize="small" />
                          Loading schedule visibility...
                        </>
                      ) : scheduleVisible ? (
                        <>
                          <VisibilityIcon fontSize="small" />
                          Schedule visible to users
                        </>
                      ) : (
                        <>
                          <VisibilityOffIcon fontSize="small" />
                          Schedule hidden from users
                        </>
                      )}
                    </Box>
                  }
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setShowNewEvent(true)}
                  disabled={showNewEvent}
                >
                  Add Event
                </Button>
              </Box>

              {/* Events List */}
              {eventsLoading || settingsLoading ? (
                <Box component="div" display="flex" justifyContent="center" py={8}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {showNewEvent && (
                    <ScheduleEventCard
                      isNew
                      onSave={handleCreateEvent}
                      onCancel={() => setShowNewEvent(false)}
                      isLoading={isCreating}
                    />
                  )}
                {sortedEvents.length === 0 && !showNewEvent ? (
                  <Box component="div" textAlign="center" py={8}>
                    <Typography variant="body1" color="text.secondary">
                      No events yet. Click &quot;Add Event&quot; to create one.
                    </Typography>
                  </Box>
                ) : (
                  pagedEvents.map((event) => (
                    <ScheduleEventCard
                      key={event.id}
                      event={event}
                      onSave={(data) => handleUpdateEvent(event.id, data)}
                      onDelete={() => handleDeleteEvent(event.id)}
                      isLoading={isUpdating || isDeleting}
                    />
                  ))
                )}
                {sortedEvents.length > pageSize && (
                  <Stack direction="row" justifyContent="center" py={3}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(_, value) => setPage(value)}
                      color="primary"
                    />
                  </Stack>
                )}
              </>
            )}
          </Container>
        </Fade>
      )}
    </>
  )
}

export default ScheduleManagement
