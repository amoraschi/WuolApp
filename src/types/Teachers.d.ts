import { Pagination } from './Common'
import { CommunitySubject } from './Community'
import { User } from './User'

export interface Teachers {
  items: Teacher[]
  pagination: Pagination
}

export interface Teacher {
  id: string
  email: string
  userId: number
  notes: string
  status: string
  createdAt: number
  lastUpdatedAt: number
  version: string
  phoneNumber: string
  prices: Price[]
  textAvailability: string
  communitySubjects: CommunitySubject[]
  profile: User
}

export interface Price {
  classDuration: number
  numClasses: number
  wuolahCommission: PricePerClass
  pricePerClass: PricePerClass
}

export interface PricePerClass {
  amount: number
  currency: string
  scale: number
}
