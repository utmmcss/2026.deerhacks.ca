export type Team = {
  id: number
  name: string
  description: string
  owner_id: number
  member_count: number
  last_active_at: string
  created_at: string
}

export type TeamMember = {
  user_id: number
  first_name: string
  last_name: string
  username: string
  is_owner: boolean
  requested_at: string
  joined_at: string | null
  state: 'pending' | 'joined' | 'left'
}

export type TeamDetail = {
  id: number
  name: string
  description: string
  owner_id: number
  owner_discord_id: string
  members: TeamMember[]
  last_active_at: string
  created_at: string
}

export type AvailableUser = {
  user_id: number
  first_name: string
  last_name: string
  username: string
  discord_id: string
  school: string
  program: string
  interests: string[]
}

// Request types
export type TeamCreateReq = {
  name: string
  description?: string
}

export type TeamUpdateReq = {
  name?: string
  description?: string
}

export type TeamJoinRequestReq = {
  team_id: number
}

export type TeamJoinRespondReq = {
  user_id: number
  action: 'approve' | 'reject'
}

export type TeamTransferReq = {
  new_owner_id: number
}

// Response types
export type TeamResp = {
  team: TeamDetail | null
}

export type TeamsListResp = {
  teams: Team[]
  max_size: number
}

export type AvailableUsersResp = {
  users: AvailableUser[]
}

export type TeamMessageResp = {
  message: string
}
