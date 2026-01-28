import { ArchetypeAnswer, Planet, planetOptions } from '@/types/Application'

type Weight = {
  primary: Planet
  secondary?: Planet
}

// Question weights based on user requirements
// Primary archetype: +2 points, Secondary archetype: +1 point
const questionWeights: Record<number, Record<string, Weight>> = {
  1: {
    A: { primary: 'Venus', secondary: 'Neptune' },
    B: { primary: 'Earth', secondary: 'Saturn' },
    C: { primary: 'Jupiter' },
    D: { primary: 'Uranus' },
    E: { primary: 'Sun', secondary: 'Mercury' },
  },
  2: {
    A: { primary: 'Saturn' },
    B: { primary: 'Mars' },
    C: { primary: 'Moon' },
    D: { primary: 'Neptune' },
    E: { primary: 'Mercury' },
  },
  3: {
    A: { primary: 'Earth' },
    B: { primary: 'Venus' },
    C: { primary: 'Jupiter' },
    D: { primary: 'Uranus' },
    E: { primary: 'Moon' },
  },
  4: {
    A: { primary: 'Mercury' },
    B: { primary: 'Mars', secondary: 'Sun' },
    C: { primary: 'Earth' },
    D: { primary: 'Neptune' },
    E: { primary: 'Sun' },
  },
  5: {
    A: { primary: 'Mars' },
    B: { primary: 'Mercury' },
    C: { primary: 'Saturn' },
    D: { primary: 'Jupiter', secondary: 'Uranus' },
    E: { primary: 'Sun', secondary: 'Moon' },
  },
}

export const calculateArchetype = (
  answers: ArchetypeAnswer[]
): { scores: Record<Planet, number>; archetype: Planet } => {
  const scores = {} as Record<Planet, number>

  // Initialize all planets to 0
  planetOptions.forEach((planet) => {
    scores[planet] = 0
  })

  // Calculate scores based on answers
  answers.forEach((answer, index) => {
    if (!answer) return
    const questionNum = index + 1
    const weight = questionWeights[questionNum]?.[answer]
    if (weight) {
      scores[weight.primary] += 2
      if (weight.secondary) {
        scores[weight.secondary] += 1
      }
    }
  })

  // Find highest scoring planet
  let maxScore = 0
  let archetype: Planet = 'Venus' // default
  planetOptions.forEach((planet) => {
    if (scores[planet] > maxScore) {
      maxScore = scores[planet]
      archetype = planet
    }
  })

  return { scores, archetype }
}
