import { Pagination } from './Common'

export interface GiveawaysData {
  items: GiveawayData[]
  pagination: Pagination
}

export interface GiveawayData {
  id: string
  title: string
  subtitle: string
  description: string
  imgSrc: string
  conditionsUrl: string
  created: string
  start: string
  end: string
  participants: number
  status: string
  requirements: Requirements
}

export interface Requirements {
  communityIds: number[]
  countryIds: number[]
}
