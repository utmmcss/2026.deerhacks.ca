export type ApplicationGetResp = {
  application: Omit<Application, 'resume_file_name' | 'resume_link' | 'resume_update_count'>
  is_draft: boolean
}

export type ApplicationUpdateReq = {
  application: Application
  is_draft: boolean
}

export type ResumeUpdateResp = {
  resume_file_name: string
  resume_link: string
  resume_update_count: number
}

export type ResumeGetResp = ResumeUpdateResp | {}

export type Application = {
  /**
   * User Fields, Outside of Application
   *
   * first_name: string
   * last_name: string
   * email: string
   */

  // Demographics (for internal data collection only - no effect on acceptance)
  age: number
  gender: (typeof genderOptions)[number]

  // Education
  school: string
  program: (typeof programOptions)[number] | string

  // How they heard about us
  deerhacks_reach: (typeof deerhacksReachOptions)[number]

  // Hackathon Experience
  hackathon_experience: (typeof hackathonExperienceOptions)[number]
  previous_deerhacks_attender: boolean

  // Professional Links
  github?: string
  linkedin?: string

  // Resume Fields, Outside of Application Endpoint
  resume_link: string
  resume_file_name: string
  resume_update_count: number
  resume_consent: boolean

  // Topics of Interest
  interests: (typeof interestsOptions)[number][]

  // Essay Questions
  deerhacks_pitch: string
  shared_project: string
  future_tech: string
  project_pitch: string

  // Dietary & Meals
  diet_restriction: ((typeof dietaryRestrictionsOptions)[number] | string)[]
  day1_dinner: boolean
  day2_breakfast: boolean
  day2_lunch: boolean
  day2_dinner: boolean
  day3_breakfast: boolean
  is_fasting: boolean

  // Archetype Quiz (single answer)
  archetype_answer: ArchetypeAnswer
  archetype_scores: Record<Planet, number>
  archetype: Planet | ''
}

// Archetype Types - now single answer A-J
export type ArchetypeAnswer = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | ''

export const archetypeAnswerOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] as const

export const planetOptions = [
  'Earth',
  'Mars',
  'Venus',
  'Mercury',
  'Jupiter',
  'Saturn',
  'Neptune',
  'Uranus',
  'Moon',
  'Sun',
] as const

export type Planet = (typeof planetOptions)[number]

// Planet Avatar Question - single question with 10 options
export const archetypeQuestion = {
  id: 1,
  intro: "This question is just for fun and will not affect your acceptance!",
  question: "It's 2:33 AM. The demo is in 9 hours. It works on one machine, only if you're careful, and there are bugs that exist for reasons beyond human comprehension. You have no time to rebuild. \"We might be cooked guys.\" What do you do?",
  options: {
    A: 'Strip things down to the most reliable pieces and make something solid enough to show. Tie up loose ends, clean up edge cases, and refactor the janky parts.',
    B: "Come up with a last-minute fix and go all in. Hammer at it nonstop until either it works or time's up. It'll work.",
    C: 'Presentation is the priority now. Open the UI and begin tweaking and polishing. Make sure nothing embarrassing breaks on stage. Visuals will make the idea land even if parts fail.',
    D: "Communication is key. Pull everyone together and clarify what's left. Rewrite the plan, and make sure each person knows exactly what they're responsible for.",
    E: 'Zoom out and rethink the project structure. Reframe the project around the underlying system and change how the big pieces fit together.',
    F: 'Debug debug debug. Trace error messages, check logs, and isolate the failure points to fix as many errors as possible.',
    G: 'Time to pivot concepts. Start tossing out wild "what if" ideas that reframe the whole project and make the broken parts feel intentional or irrelevant.',
    H: "Lean into the unconventional. Test an unusual library, API, or tool in a way it's not meant to be used. Rather than hiding the rough parts of your demo, suggest showcasing them as experimental aspects.",
    I: 'Turn your flexibility to the max. Jump in wherever the biggest fire is, helping teammates unblock or recover. Fill gaps wherever needed (coding, testing, recovering morale). Get your team across the finish line.',
    J: "Take initiative, renew confidence and keep morale high: remind everyone why this project is cool, keep energy up, and make sure the team doesn't spiral at 3 AM.",
  },
} as const

// Maps answer to planet
export const answerToPlanetMap: Record<string, Planet> = {
  A: 'Earth',
  B: 'Mars',
  C: 'Venus',
  D: 'Mercury',
  E: 'Jupiter',
  F: 'Saturn',
  G: 'Neptune',
  H: 'Uranus',
  I: 'Moon',
  J: 'Sun',
}

export const OTHER_SPECIFY = 'Other (Specify)'

// Simplified gender options - no "Other (Specify)"
export const genderOptions = ['Male', 'Female', 'Non-Binary', 'Choose not to answer'] as const

// Programs - keeping existing list with OTHER_SPECIFY
export const programOptions = [
  'Accounting',
  'Actuarial Science',
  'Advertising & Public Relations',
  'Aerospace Engineering',
  'Agricultural Economics',
  'Agriculture Production & Management',
  'Animal Sciences',
  'Anthropology & Archeology',
  'Applied Mathematics',
  'Architectural Engineering',
  'Architecture',
  'Area Ethnic & Civilization Studies',
  'Art History & Criticism',
  'Art & Music Education',
  'Astronomy & Astrophysics',
  'Atmospheric Sciences & Meteorology',
  'Biochemical Sciences',
  'Biological Engineering',
  'Biology',
  'Biomedical Engineering',
  'Botany',
  'Business Economics',
  'Business Management & Administration',
  'Chemical Engineering',
  'Chemistry',
  'Civil Engineering',
  'Clinical Psychology',
  'Cognitive Science & Biopsychology',
  'Commercial Art & Graphic Design',
  'Communication Disorders Sciences & Services',
  'Communication Technologies',
  'Communications',
  'Community & Public Health',
  'Composition & Rhetoric',
  'Computer Administration Management & Security',
  'Computer Engineering',
  'Computer Networking & Telecommunications',
  'Computer Programming & Data Processing',
  'Computer Science',
  'Computer & Information Systems',
  'Construction Services',
  'Cosmetology Services & Culinary Arts',
  'Counseling Psychology',
  'Court Reporting',
  'Criminal Justice & Fire Protection',
  'Criminology',
  'Drama & Theater Arts',
  'Early Childhood Education',
  'Ecology',
  'Economics',
  'Educational Administration & Supervision',
  'Educational Psychology',
  'Electrical Engineering',
  'Electrical Engineering Technology',
  'Electrical, Mechanical, & Precision Technologies & Production',
  'Elementary Education',
  'Engineering Mechanics Physics & Science',
  'Engineering Technologies',
  'Engineering & Industrial Management',
  'English Language & Literature',
  'Environmental Engineering',
  'Environmental Science',
  'Family & Consumer Sciences',
  'Film Video & Photographic Arts',
  'Finance',
  'Fine Arts',
  'Food Science',
  'Forestry',
  'French German Latin & Other Common Foreign Language Studies',
  'General Agriculture',
  'General Business',
  'General Education',
  'General Engineering',
  'General Medical & Health Services',
  'General Social Sciences',
  'Genetics',
  'Geography',
  'Geological & Geophysical Engineering',
  'Geology & Earth Science',
  'Geosciences',
  'Health & Medical Administrative Services',
  'Health & Medical Preparatory Programs',
  'History',
  'Hospitality Management',
  'Human Resources & Personnel Management',
  'Human Services & Community Organization',
  'Humanities',
  'Industrial Production Technologies',
  'Industrial & Manufacturing Engineering',
  'Industrial & Organizational Psychology',
  'Information Sciences',
  'Intercultural & International Studies',
  'Interdisciplinary Social Sciences',
  'International Business',
  'International Relations',
  'Journalism',
  'Language & Drama Education',
  'Liberal Arts',
  'Library Science',
  'Linguistics & Comparative Language & Literature',
  'Management Information Systems & Statistics',
  'Marketing & Marketing Research',
  'Mass Media',
  'Materials Engineering & Materials Science',
  'Materials Science',
  'Mathematics',
  'Mathematics Teacher Education',
  'Mathematics & Computer Science',
  'Mechanical Engineering',
  'Mechanical Engineering Related Technologies',
  'Medical Assisting Services',
  'Medical Technologies Technicians',
  'Metallurgical Engineering',
  'Microbiology',
  'Military Technologies',
  'Mining & Mineral Engineering',
  'Miscellaneous Agriculture',
  'Miscellaneous Biology',
  'Miscellaneous Business & Medical Administration',
  'Miscellaneous Education',
  'Miscellaneous Engineering',
  'Miscellaneous Engineering Technologies',
  'Miscellaneous Fine Arts',
  'Miscellaneous Health Medical Professions',
  'Miscellaneous Psychology',
  'Miscellaneous Social Sciences',
  'Molecular Biology',
  'Multi-Disciplinary / General Science',
  'Multi / Interdisciplinary Studies',
  'Music',
  'Natural Resources Management',
  'Naval Architecture & Marine Engineering',
  'Neuroscience',
  'Nuclear Engineering',
  'Nuclear, Industrial Radiology, & Biological Technologies',
  'Nursing',
  'Nutrition Sciences',
  'Oceanography',
  'Operations Logistics & E-Commerce',
  'Other Foreign Languages',
  'Petroleum Engineering',
  'Pharmacology',
  'Pharmacy Pharmaceutical Sciences & Administration',
  'Philosophy & Religious Studies',
  'Physical Fitness Parks Recreation & Leisure',
  'Physical Sciences',
  'Physical & Health Education Teaching',
  'Physics',
  'Physiology',
  'Plant Science & Agronomy',
  'Political Science & Government',
  'Pre-Law & Legal Studies',
  'Psychology',
  'Public Administration',
  'Public Policy',
  'School Student Counseling',
  'Science & Computer Teacher Education',
  'Secondary Teacher Education',
  'Social Psychology',
  'Social Science / History Teacher Education',
  'Social Work',
  'Sociology',
  'Soil Science',
  'Special Needs Education',
  'Statistics & Decision Science',
  'Studio Arts',
  'Teacher Education',
  'Theology & Religious Vocations',
  'Transportation Sciences & Technologies',
  'Treatment Therapy Professions',
  'United States History',
  'Visual & Performing Arts',
  'Zoology',
  OTHER_SPECIFY,
] as const

// Simplified hackathon experience options
export const hackathonExperienceOptions = [
  'First timer',
  'Enthusiast (1-2)',
  'Veteran (3-5)',
] as const

// Updated interests options
export const interestsOptions = [
  'AI',
  'BioInformatics',
  'Cloud Technologies',
  'Cyber Security',
  'Data Science & Analytics',
  'Software Engineering',
  'Machine Learning',
  'Natural Language Processing',
  'Web Dev',
  'UX/UI',
  'Game Development',
] as const

// Simplified deerhacks reach options
export const deerhacksReachOptions = ['University', 'Social Media', 'Other'] as const

// Dietary restrictions with "Other" option for custom input
export const dietaryRestrictionsOptions = [
  'Halal',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  OTHER_SPECIFY,
] as const
