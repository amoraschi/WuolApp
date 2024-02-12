export interface WuolahUser {
  id: number
  bio: null
  createdAt: string
  updatedAt: string
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
}

export interface DefaultCommunity {
  userId: number
  communityId: number
  default: boolean
  role: null
  createdAt: string
  updatedAt: string
  deleted: boolean
  community: Community
}

export interface Community {
  id: number
  name: string
  slug: string
  status: string
  segmentations: Segmentations
  metadata: Metadata
  shortName: null
  enabled: boolean
  deleted: boolean
  blocked: boolean
  createdBy: null
  numUsers: number
  courses: number
  courseGroups: CourseGroup[]
  logoUrl: null
  backgroundUrl: null
  enrolledStudents: number
  enrolledStudentsPrecision: string
  isActiveByMarketShare: boolean
  createdAt: number
  updatedAt: number
  lastUpdatedAt: null
  deletedAt: number
}

export interface CourseGroup {
  order: number
  courseId: number
  defaultTolgeeKeyPrefix: string
}

export interface Metadata {
  pfIsStudyGrouping: boolean
}

export interface Segmentations {
  country: Center
  countryCode: CountryCode
  city: City
  university: Center
  studyType: Center
  study: Center
  center: Center
}

export interface Center {
  id: number
  order: Order
  visible: Visible
  item?: CenterItem
}

export interface CenterItem {
  id: number
  name: string
  shortName: string
  link?: string
  slug: string
  countryId?: number
  cityId?: number
  universityId?: number
  verified?: boolean
  deleted?: boolean
  longitude?: string
  latitude?: string
  backgroundUrl?: string
  iconUrl?: string
  visible?: boolean
  order?: number
  status?: number
  logoUrl?: string
}

export interface Order {
  default: number
  pfCommunityHeader: number
}

export interface Visible {
  default: boolean
  pfCommunityHeader: boolean
}

export interface City {
  id: number
  order: Order
  visible: Visible
  item: CityItem
}

export interface CityItem {
  id: number
  name: string
  countryId: number
  shortName: string
  verified?: boolean
  slug: string
  iconUrl: string
  order?: number
  status?: number
}

export interface CountryCode {
  id: string
  order: Order
  visible: Visible
}
