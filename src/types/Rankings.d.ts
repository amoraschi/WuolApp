import { Pagination, Segmentation } from '@/types/Common'
import { User } from '@/types/User'

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
