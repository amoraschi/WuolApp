import { Pagination } from '@/types/Common'
import { CommunitySubject } from '@/types/Community'
import { User } from '@/types/User'

export interface TeachersData {
  items: Teacher[]
  pagination: Pagination
}

export interface TeacherData {
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
