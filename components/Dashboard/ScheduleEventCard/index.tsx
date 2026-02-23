import { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SaveIcon from '@mui/icons-material/Save'
import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { EventCreateReq } from '@/types/Admin'
import { EventHosts, eventHosts, EventTypes, eventTypes, RespEvent } from '@/types/Event'

type Props = {
  event?: RespEvent
  isNew?: boolean
  onSave: (data: EventCreateReq) => void
  onDelete?: () => void
  onCancel?: () => void
  isLoading?: boolean
}

type FormData = {
  title: string
  description: string
  location: string
  start_time: string
  end_time: string
  points_value: string
  important: boolean
  host: EventHosts
  presenter: string
  type: EventTypes
}

const formatDateTimeLocal = (isoString: string) => {
  const date = new Date(isoString)
  const pad = (value: number) => value.toString().padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`
}

const formatDateTimeForApi = (localDateTime: string) => {
  const date = new Date(localDateTime)
  return date.toISOString()
}

const ScheduleEventCard = (props: Props) => {
  const { event, isNew, onSave, onDelete, onCancel, isLoading } = props

  const [expanded, setExpanded] = useState(isNew ?? false)
  const [formData, setFormData] = useState<FormData>({
    title: event?.attributes.title ?? '',
    description: event?.attributes.description ?? '',
    location: event?.attributes.location ?? '',
    start_time: event?.attributes.startTime ? formatDateTimeLocal(event.attributes.startTime) : '',
    end_time: event?.attributes.endTime ? formatDateTimeLocal(event.attributes.endTime) : '',
    points_value: String(event?.attributes.points_value ?? ''),
    important: event?.attributes.important ?? false,
    host: event?.attributes.host ?? 'deerhacks',
    presenter: event?.attributes.presenter ?? '',
    type: event?.attributes.type ?? 'other',
  })

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    const trimmedPoints = formData.points_value.trim()
    const parsedPoints = trimmedPoints === '' ? undefined : Number(trimmedPoints)
    if (
      parsedPoints !== undefined &&
      (!Number.isInteger(parsedPoints) || parsedPoints < 0)
    ) {
      return
    }

    const dataToSave: EventCreateReq = {
      title: formData.title,
      description: formData.description,
      location: formData.location || undefined,
      start_time: formatDateTimeForApi(formData.start_time),
      end_time: formData.end_time ? formatDateTimeForApi(formData.end_time) : undefined,
      points_value: parsedPoints,
      important: formData.important,
      host: formData.host,
      presenter: formData.presenter || undefined,
      type: formData.type,
    }
    onSave(dataToSave)
  }

  const eventDate = event?.attributes.startTime
    ? new Date(event.attributes.startTime).toLocaleString('en-CA', {
        timeZone: 'America/Toronto',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'No date set'

  if (isNew || expanded) {
    return (
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          background: 'rgba(30, 30, 35, 0.7)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <CardContent>
          <Typography variant="h3" gutterBottom>
            {isNew ? 'New Event' : 'Edit Event'}
          </Typography>
          <Box component="div" display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
              fullWidth
              multiline
              rows={3}
            />
            <Box component="div" display="flex" gap={2}>
              <TextField
                label="Start Time"
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => handleChange('start_time', e.target.value)}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Time"
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => handleChange('end_time', e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box component="div" display="flex" gap={2}>
              <TextField
                label="Location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                fullWidth
              />
              <TextField
                label="Presenter"
                value={formData.presenter}
                onChange={(e) => handleChange('presenter', e.target.value)}
                fullWidth
              />
            </Box>
            <TextField
              label="Points Value"
              type="number"
              value={formData.points_value}
              onChange={(e) => handleChange('points_value', e.target.value)}
              fullWidth
              inputProps={{ min: 0, step: 1 }}
              helperText="Set > 0 for workshop QR eligibility. Leave blank for 0."
            />
            <Box component="div" display="flex" gap={2}>
              <TextField
                select
                label="Host"
                value={formData.host}
                onChange={(e) => handleChange('host', e.target.value)}
                fullWidth
              >
                {eventHosts.map((host) => (
                  <MenuItem key={host} value={host}>
                    {host}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Type"
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                fullWidth
              >
                {eventTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.important}
                  onChange={(e) => handleChange('important', e.target.checked)}
                />
              }
              label="Important event"
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              if (isNew && onCancel) {
                onCancel()
              } else {
                setExpanded(false)
              }
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={isLoading || !formData.title || !formData.description || !formData.start_time}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        background: 'rgba(30, 30, 35, 0.7)',
        backdropFilter: 'blur(20px)',
        cursor: 'pointer',
        '&:hover': { borderColor: 'primary.main' },
      }}
      onClick={() => setExpanded(true)}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box component="div">
          <Box component="div" display="flex" alignItems="center" gap={1} mb={0.5}>
            <Typography variant="h3">{event?.attributes.title}</Typography>
            {event?.attributes.important && <StarIcon color="warning" fontSize="small" />}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {eventDate} • {event?.attributes.location || 'No location'} • {event?.attributes.type}
          </Typography>
        </Box>
        <Box component="div" display="flex" alignItems="center" gap={1}>
          <Chip label={event?.attributes.host} size="small" />
          {(event?.attributes.points_value ?? 0) > 0 && (
            <Chip label={`${event?.attributes.points_value} pts`} color="success" size="small" />
          )}
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              if (onDelete && confirm('Are you sure you want to delete this event?')) {
                onDelete()
              }
            }}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
          <ExpandMoreIcon />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ScheduleEventCard
