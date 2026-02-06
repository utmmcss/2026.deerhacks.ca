import {
  answerToPlanetMap,
  Application,
  deerhacksReachOptions,
  dietaryRestrictionsOptions,
  genderOptions,
  hackathonExperienceOptions,
  interestsOptions,
  OTHER_SPECIFY,
  Planet,
  planetOptions,
  programOptions,
} from '@/types/Application'
import {
  AboutYouZodForm,
  ArchetypeZodForm,
  DeerhacksZodForm,
  ExperienceZodForm,
  OpenEndedResponsesZodForm,
} from '@/types/Zod'

export const toDropdownType = <T extends any>(
  options: readonly T[],
  value: string
): T | undefined => {
  if (!value) return undefined
  return (options as unknown as string[]).includes(value) ? (value as T) : (OTHER_SPECIFY as T)
}

export const toMultiSelectType = <T extends any>(
  options: readonly T[],
  value: string[]
): { options: T[]; other: string } => {
  if (!value) return { options: [], other: '' }
  const selected = value.filter(function (item, pos, self) {
    return self.indexOf(item) == pos
  })
  const i = selected.findIndex((val) => !(options as unknown as string[]).includes(val))
  const other = i !== -1 ? selected.splice(i, 1)[0] : ''
  return { options: selected as T[], other }
}

const appToAboutForm = (application: Application) => {
  return {
    age: application.age == 0 ? undefined : application.age.toString(),
    gender: application.gender as (typeof genderOptions)[number] | undefined,
  }
}

const appToExpForm = (application: Application) => {
  const program = toDropdownType(programOptions, application.program)
  const hackathon_experience = toDropdownType(
    hackathonExperienceOptions,
    application.hackathon_experience
  )
  const { options: interests } = toMultiSelectType(interestsOptions, application.interests)

  return {
    school: application.school,
    program,
    ...(program == OTHER_SPECIFY && { program_other: application.program }),
    resume_link: application.resume_link,
    resume_file_name: application.resume_file_name,
    resume_update_count: application.resume_update_count,
    resume_consent: application.resume_consent,
    ...(application.github && { github: application.github }),
    ...(application.linkedin && { linkedin: application.linkedin }),
    hackathon_experience,
    previous_deerhacks_attender: application.previous_deerhacks_attender,
    interests,
  }
}

const appToOpenResponseForm = (application: Application) => {
  return {
    deerhacks_pitch: application.deerhacks_pitch,
    shared_project: application.shared_project,
    future_tech: application.future_tech,
    project_pitch: application.project_pitch,
  }
}

const appToDeerHacksForm = (application: Application) => {
  const { options: diet_restriction, other: diet_restriction_other } = toMultiSelectType(
    dietaryRestrictionsOptions,
    application.diet_restriction
  )

  return {
    deerhacks_reach: application.deerhacks_reach as (typeof deerhacksReachOptions)[number] | undefined,
    diet_restriction: (diet_restriction_other
      ? [...diet_restriction, OTHER_SPECIFY]
      : diet_restriction) as (typeof dietaryRestrictionsOptions)[number][],
    ...(diet_restriction_other && { diet_restriction_other }),
    day1_dinner: application.day1_dinner,
    day2_breakfast: application.day2_breakfast,
    day2_lunch: application.day2_lunch,
    day2_dinner: application.day2_dinner,
    day3_breakfast: application.day3_breakfast,
    is_fasting: application.is_fasting,
  }
}

const appToArchetypeForm = (application: Application) => {
  return {
    archetype_answer: application.archetype_answer || undefined,
  }
}

export const appToFormMap = {
  AboutYou: appToAboutForm,
  Experience: appToExpForm,
  OpenEndedResponses: appToOpenResponseForm,
  DeerHacks: appToDeerHacksForm,
  Archetype: appToArchetypeForm,
}

const aboutFormToApp = (form: AboutYouZodForm, currApplication: Application) => {
  return {
    ...currApplication,
    age: parseInt(form.age),
    gender: form.gender,
  }
}

const expFormToApp = (form: ExperienceZodForm, currApplication: Application): Application => {
  return {
    ...currApplication,
    school: form.school as string,
    program: form.program == OTHER_SPECIFY ? (form.program_other as string) ?? '' : (form.program as string),
    resume_link: form.resume_link as string,
    resume_file_name: form.resume_file_name as string,
    resume_update_count: form.resume_update_count as number,
    resume_consent: form.resume_consent as boolean,
    github: (form.github as string) ?? '',
    linkedin: (form.linkedin as string) ?? '',
    hackathon_experience: form.hackathon_experience as (typeof hackathonExperienceOptions)[number],
    previous_deerhacks_attender: form.previous_deerhacks_attender as boolean,
    interests: form.interests as (typeof interestsOptions)[number][],
  }
}

const openResponseFormToApp = (
  form: OpenEndedResponsesZodForm,
  currApplication: Application
): Application => {
  return {
    ...currApplication,
    deerhacks_pitch: form.deerhacks_pitch ?? '',
    shared_project: form.shared_project ?? '',
    future_tech: form.future_tech ?? '',
    project_pitch: form.project_pitch ?? '',
  }
}

const deerhacksFormToApp = (form: DeerhacksZodForm, currApplication: Application): Application => {
  // Replace OTHER_SPECIFY with the actual custom text
  const diet_restriction = form.diet_restriction.map((item) =>
    item === OTHER_SPECIFY && form.diet_restriction_other ? form.diet_restriction_other : item
  )

  return {
    ...currApplication,
    deerhacks_reach: form.deerhacks_reach,
    diet_restriction,
    day1_dinner: form.day1_dinner,
    day2_breakfast: form.day2_breakfast,
    day2_lunch: form.day2_lunch,
    day2_dinner: form.day2_dinner,
    day3_breakfast: form.day3_breakfast,
    is_fasting: form.is_fasting,
  }
}

const calculateArchetypeFromAnswer = (answer: string): { scores: Record<Planet, number>; archetype: Planet } => {
  const scores = {} as Record<Planet, number>
  planetOptions.forEach((planet) => {
    scores[planet] = 0
  })

  const planet = answerToPlanetMap[answer]
  if (planet) {
    scores[planet] = 1
  }

  return { scores, archetype: planet || 'Earth' }
}

const archetypeFormToApp = (form: ArchetypeZodForm, currApplication: Application): Application => {
  const { scores, archetype } = calculateArchetypeFromAnswer(form.archetype_answer)

  return {
    ...currApplication,
    archetype_answer: form.archetype_answer,
    archetype_scores: scores,
    archetype,
  }
}

export const formToAppMap = {
  AboutYou: aboutFormToApp,
  Experience: expFormToApp,
  OpenEndedResponses: openResponseFormToApp,
  DeerHacks: deerhacksFormToApp,
  Archetype: archetypeFormToApp,
}
