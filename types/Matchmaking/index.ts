export type MatchmakingProfile = {
  id: number
  user_id: number
  role: string
  project_preference: string
  interests: string[]
  in_queue: boolean
  matched_team_id: number | null
  queue_cycles_waited: number
  last_active_at: string
}

export type MatchmakingProfileReq = {
  role: string
  project_preference: string
  interests: string[]
}

export type MatchmakingProfileResp = {
  profile: MatchmakingProfile | null
}

export const MATCHMAKING_ROLES = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'pm', label: 'Project Manager' },
  { value: 'fullstack', label: 'Full Stack Developer' },
  { value: 'data', label: 'Data / ML Engineer' },
] as const

export const MATCHMAKING_PROJECT_PREFS = [
  { value: 'web', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'ai_ml', label: 'AI / Machine Learning' },
  { value: 'game', label: 'Game Development' },
  { value: 'hardware', label: 'Hardware / IoT' },
  { value: 'other', label: 'Other' },
] as const

export type PublicMatchmakingProfile = {
  role: string
  project_preference: string
  interests: string[]
}

export type PublicMatchmakingProfileResp = {
  profile: PublicMatchmakingProfile | null
}
