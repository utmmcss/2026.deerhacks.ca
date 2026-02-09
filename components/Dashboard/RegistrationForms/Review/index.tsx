import { ReactNode } from 'react'

import CheckIcon from '@mui/icons-material/Check'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import InfoIcon from '@mui/icons-material/Info'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import LoadingButton from '@/components/Dashboard/LoadingButton'
import ArchetypeResult from '@/components/Dashboard/RegistrationForms/Archetype/ArchetypeResult'
import { Application, openEndedQuestions, OTHER_SPECIFY, Planet } from '@/types/Application'
import { User } from '@/types/User'

type Props = {
  user: User
  application: Application
  onSubmit?: () => void
  hideDisclaimer?: boolean
  isSubmitting?: boolean
}

const FormReview = (props: Props) => {
  const { user, application, onSubmit, hideDisclaimer = false, isSubmitting = false } = props

  return (
    <Grid container direction="column" gap="2.5rem">
      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">Personal Information</Typography>
        {!hideDisclaimer && (
          <Typography variant="h3" color="primary" gutterBottom>
            Important: We will be checking IDs at the event for identification & age purposes.
          </Typography>
        )}
        <FieldReview name="Name" value={user.first_name + ' ' + user.last_name} />
        <FieldReview name="Email" value={user.email} />
        <br />
        <FieldReview name="Age" value={application.age.toString()} />
        <FieldReview name="Gender" value={application.gender} />
      </Grid>

      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">Experience</Typography>
        <FieldReview name="School" value={application.school} />
        <FieldReview name="Program" value={application.program} />
        <br />
        <FieldReview
          name="Resume"
          valueNode={
            <Link
              href={application.resume_link}
              rel="noopener"
              target="_blank"
              sx={{
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Typography color="text.primary" fontWeight={500}>
                {application.resume_file_name}
              </Typography>
              <DownloadRoundedIcon fontSize="inherit" />
            </Link>
          }
        />
        {application.github && (
          <FieldReview
            name="GitHub"
            valueNode={
              <Link
                href={application.github}
                rel="noopener"
                target="_blank"
                color="text.primary"
                sx={{
                  opacity: 1,
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {application.github}
              </Link>
            }
          />
        )}
        {application.linkedin && (
          <FieldReview
            name="LinkedIn"
            valueNode={
              <Link
                href={application.linkedin}
                rel="noopener"
                target="_blank"
                color="text.primary"
                sx={{
                  opacity: 1,
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {application.linkedin}
              </Link>
            }
          />
        )}
        <br />
        <FieldReview
          name="Number of Hackathons Attended"
          value={application.hackathon_experience}
        />
        <CheckBoxReview
          name="Previous DeerHacks Attender"
          value={application.previous_deerhacks_attender}
        />
        <FieldReview name="Topics of Interest" value={formatList(application.interests)} isList />
      </Grid>

      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">Open Ended Responses</Typography>
        <FieldReview
          name={openEndedQuestions.deerhacks_pitch.question}
          value={application.deerhacks_pitch}
        />
        <FieldReview
          name={openEndedQuestions.shared_project.question}
          value={application.shared_project}
        />
        <FieldReview
          name={openEndedQuestions.future_tech.question}
          value={application.future_tech}
        />
        <FieldReview
          name={openEndedQuestions.project_pitch.question}
          value={application.project_pitch}
        />
      </Grid>

      <Grid container direction="column" gap="1.25rem">
        <Typography variant="h2">DeerHacks</Typography>
        <FieldReview
          name="Where Did You First Hear About DeerHacks?"
          value={application.deerhacks_reach}
        />
        <FieldReview
          name="Dietary Restrictions"
          value={formatList(application.diet_restriction)}
          isList
        />
        <FieldReview name="Meals" value={getMeals(application)} isList />
        <CheckBoxReview name="Fasting" value={application.is_fasting} />
      </Grid>

      {application.archetype && (
        <Grid container direction="column" gap="1.25rem">
          <Typography variant="h2">Your Hacker Archetype</Typography>
          <ArchetypeResult archetype={application.archetype as Planet} />
        </Grid>
      )}

      {onSubmit && (
        <LoadingButton loading={isSubmitting} onClick={onSubmit}>
          Submit Application
        </LoadingButton>
      )}
    </Grid>
  )
}

const formatList = (values: string[]) => {
  if (!values?.length) return ''
  return values.filter((val) => val !== OTHER_SPECIFY).join(',\n')
}

type FieldReviewProps =
  | {
      name: string
      value: string
      valueNode?: never
      isList?: boolean
    }
  | {
      name: string
      value?: never
      valueNode: ReactNode
      isList?: boolean
    }

const FieldReview = (props: FieldReviewProps) => {
  const { name, value, valueNode, isList = false } = props
  return (
    <Box component="div" display="flex" flexDirection="column">
      <Typography>{name}</Typography>
      <Box component="div" display="flex" gap="1rem">
        {valueNode ? (
          valueNode
        ) : value && value.trim() ? (
          <Typography
            variant="h3"
            {...(isList && { whiteSpace: 'pre' })}
            textOverflow="ellipsis"
            style={{ overflowWrap: 'anywhere' }}
          >
            {value}
          </Typography>
        ) : (
          <Tooltip title="Missing" placement="left" arrow>
            <InfoIcon color="error" />
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}

type CheckBoxReviewProps = {
  name: string
  value: boolean
}

const CheckBoxReview = (props: CheckBoxReviewProps) => {
  const { name, value } = props
  return (
    <Box component="div" display="flex" flexDirection="column">
      <Typography>{name}</Typography>
      <Box component="div" display="flex" gap="1rem" alignItems="center">
        {value ? <CheckIcon color="secondary" /> : <DoDisturbIcon color="secondary" />}
      </Box>
    </Box>
  )
}

const getMeals = (app: Application) => {
  const meals = []

  if (app.day1_dinner) meals.push('Friday Dinner (Feb 14)')
  if (app.day2_breakfast) meals.push('Saturday Breakfast (Feb 15)')
  if (app.day2_lunch) meals.push('Saturday Lunch (Feb 15)')
  if (app.day2_dinner) meals.push('Saturday Dinner (Feb 15)')
  if (app.day3_breakfast) meals.push('Sunday Breakfast (Feb 16)')

  return meals.length ? formatList(meals) : 'None'
}

export default FormReview
