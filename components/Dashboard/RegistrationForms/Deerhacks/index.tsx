import { Controller, UseFormReturn } from 'react-hook-form'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

import FormCheckbox from '@/components/Dashboard/RegistrationForms/FormComponents/FormCheckbox'
import FormMultiSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormMultiSelect'
import FormSelect from '@/components/Dashboard/RegistrationForms/FormComponents/FormSelect'
import FormTextField from '@/components/Dashboard/RegistrationForms/FormComponents/FormTextField'
import { deerhacksReachOptions, dietaryRestrictionsOptions, OTHER_SPECIFY } from '@/types/Application'
import { DeerhacksZodForm } from '@/types/Zod'

type Props = {
  form: UseFormReturn<DeerhacksZodForm>
  onNext: (data: DeerhacksZodForm) => void
}

const DeerhacksForm = (props: Props) => {
  const { form, onNext } = props

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form

  return (
    <form noValidate onSubmit={handleSubmit(onNext)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Where did you first hear about DeerHacks?</Typography>
          <Controller
            name="deerhacks_reach"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormSelect
                label="Select one"
                options={deerhacksReachOptions}
                errors={errors}
                inputRef={ref}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Dietary Restrictions</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Select all that apply (leave empty if none)
          </Typography>
          <Box component="div" display="flex" flexDirection="column" gap="1rem">
            <Controller
              name="diet_restriction"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormMultiSelect
                  label="Dietary Restrictions"
                  options={dietaryRestrictionsOptions}
                  errors={errors}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            {watch('diet_restriction')?.includes(OTHER_SPECIFY) && (
              <Controller
                name="diet_restriction_other"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormTextField
                    label="Please specify"
                    errors={errors}
                    inputRef={ref}
                    {...field}
                  />
                )}
              />
            )}
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Meals you will likely attend</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Select all that apply
          </Typography>
          <Box component="div">
            <Controller
              name="day1_dinner"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormCheckbox label="Friday Dinner" errors={errors} inputRef={ref} {...field} />
              )}
            />
            <Controller
              name="day2_breakfast"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormCheckbox label="Saturday Breakfast" errors={errors} inputRef={ref} {...field} />
              )}
            />
            <Controller
              name="day2_lunch"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormCheckbox label="Saturday Lunch" errors={errors} inputRef={ref} {...field} />
              )}
            />
            <Controller
              name="day2_dinner"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormCheckbox label="Saturday Dinner" errors={errors} inputRef={ref} {...field} />
              )}
            />
            <Controller
              name="day3_breakfast"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormCheckbox label="Sunday Breakfast" errors={errors} inputRef={ref} {...field} />
              )}
            />
          </Box>
        </Grid>

        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Will you be fasting during DeerHacks?</Typography>
          <Controller
            name="is_fasting"
            control={control}
            render={({ field }) => (
              <RadioGroup
                row
                value={field.value ? 'yes' : 'no'}
                onChange={(e) => field.onChange(e.target.value === 'yes')}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
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

export default DeerhacksForm
