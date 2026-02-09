import {
  archetypeAnswerOptions,
  deerhacksReachOptions,
  dietaryRestrictionsOptions,
  genderOptions,
  hackathonExperienceOptions,
  interestsOptions,
  OTHER_SPECIFY,
  programOptions,
} from '@/types/Application'
import {
  boolean,
  enum as enumZod,
  infer as inferZod,
  intersection,
  literal,
  number,
  object,
  string,
} from 'zod'

export const textField = string()
  .trim()
  .min(1, 'Required')
  .max(128, 'Maximum Character Count Reached')
  .transform((val) => {
    return val.capitalize()
  })

export const textFieldOptional = string()
  .trim()
  .max(128, 'Maximum Character Count Reached')
  .transform((val) => {
    return val.capitalize()
  })
  .optional()

export const textArea = string().trim().max(1500, 'Maximum Character Count Reached')

export const textAreaShort = string().trim().max(1000, 'Maximum Character Count Reached')

export const textAreaPitch = string().trim().max(200, 'Maximum Character Count Reached')

export const emailField = string()
  .trim()
  .toLowerCase()
  .min(1, 'Required')
  .max(128, 'Maximum Character Count Reached')
  .email('Invalid Email Address')

export const urlField = string()
  .trim()
  .max(256, 'Maximum Character Count Reached')
  .url('Invalid URL')

const checkBoxRequired = literal<boolean>(true, {
  errorMap: () => ({ message: 'Required' }),
})

const ageField = string()
  .min(1, 'Required')
  .refine((str) => {
    const age = parseInt(str)
    if (age < 0) return false
    if (age > 100) return false
    return /^\d+$/.test(str)
  }, 'Invalid Age')
  .refine((str) => parseInt(str) >= 18, 'Must be 18+ to Apply')

// AboutYou form - simplified demographics
export const aboutYouZodForm = object({
  age: ageField,
  gender: enumZod(genderOptions, { required_error: 'Required' }),
})
export type AboutYouZodForm = inferZod<typeof aboutYouZodForm>

// Experience form - education and professional info
const program = object({
  program: enumZod(programOptions, {
    errorMap: () => ({ message: 'Required' }),
  }),
  program_other: textFieldOptional,
}).superRefine(({ program, program_other }, refinementContext) => {
  if (program.includes(OTHER_SPECIFY) && !program_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['program_other'],
    })
  }
  return refinementContext
})

export const experienceZodForm = intersection(
  program,
  object({
    school: string().trim().min(1, 'Required').max(256, 'Maximum Character Count Reached'),
    resume_file_name: string().min(1, 'Required'),
    resume_link: string().min(1, 'Required'),
    resume_update_count: number(),
    resume_consent: checkBoxRequired,
    github: urlField.or(literal('')).or(literal(undefined)),
    linkedin: urlField.or(literal('')).or(literal(undefined)),
    hackathon_experience: enumZod(hackathonExperienceOptions, { required_error: 'Required' }),
    previous_deerhacks_attender: boolean(),
    interests: enumZod(interestsOptions, { required_error: 'Required' })
      .array()
      .min(1, 'Required'),
  })
)
export type ExperienceZodForm = inferZod<typeof experienceZodForm>

// OpenEndedResponses form - essay questions
export const openEndedResponsesZodForm = object({
  deerhacks_pitch: textAreaShort.min(1, 'Required'),
  shared_project: textAreaShort.min(1, 'Required'),
  future_tech: textAreaShort.min(1, 'Required'),
  project_pitch: textAreaPitch.min(1, 'Required'),
})
export type OpenEndedResponsesZodForm = inferZod<typeof openEndedResponsesZodForm>

// DeerHacks form - meals, dietary, fasting, and reach
const dietRestriction = object({
  diet_restriction: enumZod(dietaryRestrictionsOptions, { required_error: 'Required' })
    .array()
    .min(0),
  diet_restriction_other: textFieldOptional,
}).superRefine(({ diet_restriction, diet_restriction_other }, refinementContext) => {
  if (diet_restriction.includes(OTHER_SPECIFY) && !diet_restriction_other) {
    refinementContext.addIssue({
      code: 'custom',
      message: 'Required',
      path: ['diet_restriction_other'],
    })
  }
  return refinementContext
})

export const deerhacksZodForm = intersection(
  dietRestriction,
  object({
    deerhacks_reach: enumZod(deerhacksReachOptions, { required_error: 'Required' }),
    day1_dinner: boolean(),
    day2_breakfast: boolean(),
    day2_lunch: boolean(),
    day2_dinner: boolean(),
    day3_breakfast: boolean(),
    is_fasting: boolean(),
  })
)
export type DeerhacksZodForm = inferZod<typeof deerhacksZodForm>

// Archetype form - single question
export const archetypeZodForm = object({
  archetype_answer: enumZod(archetypeAnswerOptions, { required_error: 'Required' }),
})
export type ArchetypeZodForm = inferZod<typeof archetypeZodForm>
