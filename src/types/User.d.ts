import { Pagination, PaginationObject } from './Common'
import { DefaultCommunity } from './Community'
import { FileData } from './Files'

export interface User {
  id: number
  bio: null
  createdAt: string
  updatedAt: string
  deleted?: boolean
  nickname: string
  popularity: number
  defaultCommunityId: number
  avatarUrl: string
  fallbackAvatarUrl: string
  partnerType: number
  money: number
  accumulated: number
  displayMoney: boolean
  isTeacher: boolean
  role: number
  email: string
  hasEmailVerified: boolean
  coins: number
  tickets: number
  captchaCounter: number
  lastConnection: string
  stripeId: string
  countryId: number
  language: string
  name: null
  gender: null
  birthday: null
  isPro: boolean
  hasHappyMonth: boolean
  invitationCode: string
  totalSessions: number
  gdprMailing: boolean
  gdprAdvice: boolean
  conditions: null
  socialAuth: null
  phoneNumber: null
  phoneArea: null
  hasAgreedToTc: boolean
  subscriptionTier: null
  subscriptionId: null
  downloadWithCoinsByDefault: boolean
  b_idx: number
  hasStudies: boolean
  defaultCommunity: DefaultCommunity
  subscriptionRewardPending: string
  totalMoney?: number
}

export interface UserStats {
  numDownloads: number
  numFiles: number
  numFolloweds: number
  numFollowers: number
  numPaidDownloads: number
}

interface UserBookmarks {
  data: UserBookmark[]
  meta: PaginationObject
}

interface UserBookmark {
  createdAt: string
  document: FileData
  documentId: number
  userId: number
}
