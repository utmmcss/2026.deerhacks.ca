import { EventHosts, EventTypes, RespEvent } from '@/types/Event'

// Event CRUD types
export type EventCreateReq = {
  title: string
  description: string
  location?: string
  start_time: string
  end_time?: string
  important: boolean
  host: EventHosts
  presenter?: string
  type: EventTypes
  points_value?: number
  qr_active?: boolean
}

export type EventUpdateReq = Partial<EventCreateReq>

export type AdminEventResp = {
  event: RespEvent
}

export type AdminEventListResp = {
  data: RespEvent[]
}

export type AdminEventDeleteResp = {
  message: string
}

// Settings types
export type Setting = {
  key: string
  value: string
  updated_at: string
}

export type SettingsResp = {
  settings: Setting[]
}

export type SettingUpdateReq = {
  value: string
}

export type SettingUpdateResp = {
  setting: Setting
}
