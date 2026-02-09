import { Controller, UseFormReturn } from 'react-hook-form'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import FormTextArea from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextArea'
import { openEndedQuestions } from '@/types/Application'
import { OpenEndedResponsesZodForm } from '@/types/Zod'

type Props = {
  form: UseFormReturn<OpenEndedResponsesZodForm>
  onNext: (data: OpenEndedResponsesZodForm) => void
}

const OpenEndedResponsesForm = (props: Props) => {
  const { form, onNext } = props

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  return (
    <form noValidate onSubmit={handleSubmit(onNext)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">{openEndedQuestions.deerhacks_pitch.question}</Typography>
          <Controller
            name="deerhacks_pitch"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label={openEndedQuestions.deerhacks_pitch.label}
                errors={errors}
                inputRef={ref}
                maxLength={openEndedQuestions.deerhacks_pitch.maxLength}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">{openEndedQuestions.shared_project.question}</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            {openEndedQuestions.shared_project.helperText}
          </Typography>
          <Controller
            name="shared_project"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label={openEndedQuestions.shared_project.label}
                errors={errors}
                inputRef={ref}
                maxLength={openEndedQuestions.shared_project.maxLength}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">{openEndedQuestions.future_tech.question}</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            {openEndedQuestions.future_tech.helperText}
          </Typography>
          <Controller
            name="future_tech"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label={openEndedQuestions.future_tech.label}
                errors={errors}
                inputRef={ref}
                maxLength={openEndedQuestions.future_tech.maxLength}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">{openEndedQuestions.project_pitch.question}</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            {openEndedQuestions.project_pitch.helperText}
          </Typography>
          <Controller
            name="project_pitch"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormTextArea
                label={openEndedQuestions.project_pitch.label}
                errors={errors}
                inputRef={ref}
                maxLength={openEndedQuestions.project_pitch.maxLength}
                {...field}
              />
            )}
          />
        </Grid>

        <Button type="submit" disabled={isSubmitting}>
          Next
        </Button>
      </Grid>
    </form>
  )
}

export default OpenEndedResponsesForm
