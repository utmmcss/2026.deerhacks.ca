import { useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

import ArchetypeResult from '@/components/Dashboard/RegistrationForms/Archetype/ArchetypeResult'
import { archetypeQuestions, Planet } from '@/types/Application'
import { ArchetypeZodForm } from '@/types/Zod'
import { calculateArchetype } from '@/utils/archetypeCalculator'

type Props = {
  form: UseFormReturn<ArchetypeZodForm>
  onNext: (data: ArchetypeZodForm) => void
  savedArchetype?: Planet | ''
}

const ArchetypeForm = (props: Props) => {
  const { form, onNext, savedArchetype } = props
  const [showResult, setShowResult] = useState(!!savedArchetype)
  const [calculatedArchetype, setCalculatedArchetype] = useState<Planet | null>(
    savedArchetype || null
  )

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = form

  const handleFormSubmit = (data: ArchetypeZodForm) => {
    const answers = [
      data.archetype_q1,
      data.archetype_q2,
      data.archetype_q3,
      data.archetype_q4,
      data.archetype_q5,
    ]
    const { archetype } = calculateArchetype(answers)
    setCalculatedArchetype(archetype)
    setShowResult(true)
  }

  const handleContinue = () => {
    onNext(getValues())
  }

  if (showResult && calculatedArchetype) {
    return (
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Your Hacker Archetype</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Based on your answers, we&apos;ve determined your hackathon personality!
          </Typography>
        </Grid>
        <ArchetypeResult archetype={calculatedArchetype} />
        <Button onClick={handleContinue}>Continue to Review</Button>
      </Grid>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container direction="column" gap="2.5rem">
        <Grid container direction="column" gap="1.5rem">
          <Typography variant="h2">Discover Your Hacker Archetype</Typography>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Answer these 5 questions to find out which celestial archetype matches your
            hackathon personality!
          </Typography>
        </Grid>

        {archetypeQuestions.map((q) => (
          <Card key={q.id} sx={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                {q.id}. {q.question}
              </Typography>
              <Controller
                name={`archetype_q${q.id}` as keyof ArchetypeZodForm}
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {Object.entries(q.options).map(([key, value]) => (
                      <FormControlLabel
                        key={key}
                        value={key}
                        control={<Radio />}
                        label={`${key}) ${value}`}
                        sx={{ py: 0.5, alignItems: 'flex-start', '& .MuiRadio-root': { pt: 0 } }}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
              {errors[`archetype_q${q.id}` as keyof ArchetypeZodForm] && (
                <Typography color="error" variant="caption">
                  Please select an answer
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}

        <Button type="submit">Reveal My Archetype</Button>
      </Grid>
    </form>
  )
}

export default ArchetypeForm
