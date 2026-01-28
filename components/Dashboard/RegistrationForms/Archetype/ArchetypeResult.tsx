import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { Planet } from '@/types/Application'

type ArchetypeDetail = {
  emoji: string
  title: string
  description: string
}

const archetypeDetails: { [key: string]: ArchetypeDetail } = {
  Venus: {
    emoji: '\u2601',
    title: 'The Designer',
    description:
      'You have an eye for beauty and user experience. Your projects stand out because you care about how things look and feel, not just how they work.',
  },
  Neptune: {
    emoji: '\uD83C\uDF0A',
    title: 'The Dreamer',
    description:
      'You see possibilities others miss. Your intuition and creativity lead to innovative solutions that surprise everyone.',
  },
  Earth: {
    emoji: '\uD83C\uDF0D',
    title: 'The Builder',
    description:
      'Practical and reliable, you turn ideas into reality. Your grounded approach ensures projects actually get finished and work properly.',
  },
  Saturn: {
    emoji: '\uD83D\uDD2E',
    title: 'The Strategist',
    description:
      'Methodical and disciplined, you excel at planning and execution. Nothing escapes your systematic approach to debugging and problem-solving.',
  },
  Jupiter: {
    emoji: '\uD83C\uDF00',
    title: 'The Visionary',
    description:
      'You dream big and inspire others to reach for the stars. Your optimism and ambition push projects to be more than just functional.',
  },
  Uranus: {
    emoji: '\u2744',
    title: 'The Innovator',
    description:
      'You push boundaries and embrace the cutting edge. Convention is just a starting point for your revolutionary ideas and technical experiments.',
  },
  Sun: {
    emoji: '\uD83C\uDF1E',
    title: 'The Leader',
    description:
      'Natural charisma and confidence make you a born leader. You light up any team and inspire peak performance from everyone around you.',
  },
  Mercury: {
    emoji: '\uD83D\uDCA8',
    title: 'The Communicator',
    description:
      'Quick-witted and adaptable, you excel at explaining complex ideas and pitching projects. Information flows through you effortlessly.',
  },
  Mars: {
    emoji: '\uD83D\uDD25',
    title: 'The Warrior',
    description:
      'Driven and determined, you tackle challenges head-on. Your energy and persistence are unstoppable forces that push through any obstacle.',
  },
  Moon: {
    emoji: '\uD83C\uDF13',
    title: 'The Nurturer',
    description:
      'Empathetic and supportive, you bring emotional intelligence to your team. You help everyone feel valued and keep morale high.',
  },
}

type Props = {
  archetype: Planet
}

const ArchetypeResult = ({ archetype }: Props) => {
  const details = archetypeDetails[archetype]

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        textAlign: 'center',
        py: 4,
      }}
    >
      <CardContent>
        <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
          {details.emoji}
        </Typography>
        <Typography variant="h2" color="primary" gutterBottom>
          You are {archetype}
        </Typography>
        <Typography variant="h3" gutterBottom>
          {details.title}
        </Typography>
        <div style={{ maxWidth: 500, margin: '16px auto 0' }}>
          <Typography color="text.secondary">{details.description}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ArchetypeResult
