import { Pagination, Segmentation } from './Common'
import { User } from './User'

export interface Rankings {
  items: Ranking[]
  pagination: Pagination
}

export interface Ranking {
  value: number
  rank: number
  userId: number
  segmentation: Segmentation
  user: User
}
