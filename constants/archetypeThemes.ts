import { Planet } from '@/types/Application'

export type ArchetypeTheme = {
  emoji: string
  title: string
  colors: {
    primary: string
    secondary: string
    glow: string
    gradient: string
    glowGradient: string
    avatarShadow: string
  }
}

export const archetypeThemes: Record<Planet, ArchetypeTheme> = {
  Venus: {
    emoji: '\u2601\uFE0F',
    title: 'The Designer',
    colors: {
      primary: 'hsl(330, 70%, 65%)',
      secondary: 'hsl(280, 60%, 70%)',
      glow: 'rgba(236, 130, 200, 0.4)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(236, 130, 200, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(180, 130, 220, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(255, 182, 216, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #ec82c8, #b482dc, #ffb6d8, #b482dc, #ec82c8)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #ec82c8) drop-shadow(2px 1px 1px #b482dc) drop-shadow(-1px -2px 1px #ffb6d8)',
    },
  },
  Neptune: {
    emoji: '\uD83C\uDF0A',
    title: 'The Dreamer',
    colors: {
      primary: 'hsl(210, 80%, 60%)',
      secondary: 'hsl(240, 70%, 70%)',
      glow: 'rgba(100, 149, 237, 0.4)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(100, 149, 237, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(138, 43, 226, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(65, 105, 225, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #6495ed, #8a2be2, #4169e1, #8a2be2, #6495ed)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #6495ed) drop-shadow(2px 1px 1px #8a2be2) drop-shadow(-1px -2px 1px #4169e1)',
    },
  },
  Earth: {
    emoji: '\uD83C\uDF0D',
    title: 'The Builder',
    colors: {
      primary: 'hsl(120, 50%, 45%)',
      secondary: 'hsl(35, 60%, 50%)',
      glow: 'rgba(60, 140, 60, 0.4)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(60, 140, 60, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(139, 90, 43, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(34, 139, 34, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #3c8c3c, #8b5a2b, #228b22, #8b5a2b, #3c8c3c)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #3c8c3c) drop-shadow(2px 1px 1px #8b5a2b) drop-shadow(-1px -2px 1px #228b22)',
    },
  },
  Saturn: {
    emoji: '\uD83D\uDD2E',
    title: 'The Strategist',
    colors: {
      primary: 'hsl(270, 60%, 55%)',
      secondary: 'hsl(220, 50%, 45%)',
      glow: 'rgba(138, 80, 190, 0.4)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(138, 80, 190, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(100, 120, 160, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(147, 112, 219, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #8a50be, #6478a0, #9370db, #6478a0, #8a50be)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #8a50be) drop-shadow(2px 1px 1px #6478a0) drop-shadow(-1px -2px 1px #9370db)',
    },
  },
  Jupiter: {
    emoji: '\uD83C\uDF00',
    title: 'The Visionary',
    colors: {
      primary: 'hsl(30, 80%, 55%)',
      secondary: 'hsl(45, 90%, 50%)',
      glow: 'rgba(230, 140, 60, 0.4)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(230, 140, 60, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(255, 200, 50, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(255, 165, 0, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #e68c3c, #ffc832, #ffa500, #ffc832, #e68c3c)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #e68c3c) drop-shadow(2px 1px 1px #ffc832) drop-shadow(-1px -2px 1px #ffa500)',
    },
  },
  Uranus: {
    emoji: '\u2744\uFE0F',
    title: 'The Innovator',
    colors: {
      primary: 'hsl(185, 70%, 55%)',
      secondary: 'hsl(200, 80%, 65%)',
      glow: 'rgba(64, 224, 208, 0.4)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(64, 224, 208, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(100, 200, 255, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(0, 206, 209, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #40e0d0, #64c8ff, #00ced1, #64c8ff, #40e0d0)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #40e0d0) drop-shadow(2px 1px 1px #64c8ff) drop-shadow(-1px -2px 1px #00ced1)',
    },
  },
  Sun: {
    emoji: '\uD83C\uDF1E',
    title: 'The Leader',
    colors: {
      primary: 'hsl(45, 100%, 55%)',
      secondary: 'hsl(35, 100%, 50%)',
      glow: 'rgba(255, 200, 50, 0.5)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(255, 200, 50, 0.3), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(255, 165, 0, 0.2), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(255, 215, 0, 0.15), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #ffc832, #ffa500, #ffd700, #ffa500, #ffc832)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #ffc832) drop-shadow(2px 1px 1px #ffa500) drop-shadow(-1px -2px 1px #ffd700)',
    },
  },
  Mercury: {
    emoji: '\uD83D\uDCA8',
    title: 'The Communicator',
    colors: {
      primary: 'hsl(200, 60%, 60%)',
      secondary: 'hsl(180, 50%, 70%)',
      glow: 'rgba(135, 206, 235, 0.4)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(135, 206, 235, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(175, 238, 238, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(100, 149, 237, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #87ceeb, #afeeee, #6495ed, #afeeee, #87ceeb)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #87ceeb) drop-shadow(2px 1px 1px #afeeee) drop-shadow(-1px -2px 1px #6495ed)',
    },
  },
  Mars: {
    emoji: '\uD83D\uDD25',
    title: 'The Warrior',
    colors: {
      primary: 'hsl(0, 80%, 55%)',
      secondary: 'hsl(25, 100%, 50%)',
      glow: 'rgba(220, 50, 50, 0.4)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(220, 50, 50, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(255, 100, 50, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(255, 69, 0, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #dc3232, #ff6432, #ff4500, #ff6432, #dc3232)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #dc3232) drop-shadow(2px 1px 1px #ff6432) drop-shadow(-1px -2px 1px #ff4500)',
    },
  },
  Moon: {
    emoji: '\uD83C\uDF13',
    title: 'The Nurturer',
    colors: {
      primary: 'hsl(220, 30%, 75%)',
      secondary: 'hsl(240, 20%, 80%)',
      glow: 'rgba(190, 200, 220, 0.4)',
      gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(190, 200, 220, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(200, 200, 230, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(176, 196, 222, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
      glowGradient:
        'linear-gradient(135deg, #bec8dc, #c8c8e6, #b0c4de, #c8c8e6, #bec8dc)',
      avatarShadow:
        'drop-shadow(1px 2px 5px #bec8dc) drop-shadow(2px 1px 1px #c8c8e6) drop-shadow(-1px -2px 1px #b0c4de)',
    },
  },
}

export const defaultTheme = {
  gradient: `radial-gradient(circle closest-corner at 25% 60%, rgba(238, 39, 39, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(238, 164, 39, 0.1), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#292b2f, #121212)`,
  glowGradient:
    'linear-gradient(135deg,#d6551b,#db3a3a,#c844b0,#ae34d0,#8f55f5,#ae34d0,#c844b0,#db3a3a,#d6551b)',
  avatarShadow:
    'drop-shadow(1px 2px 5px #d36bc6) drop-shadow(2px 1px 1px #eaaf0f) drop-shadow(-1px -2px 1px #d6551b) drop-shadow(-2px -2px 1px #c844b0)',
}
