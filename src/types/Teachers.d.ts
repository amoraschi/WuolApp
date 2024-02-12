export interface Teachers {
  items: Item[]
  pagination: Pagination
}

export interface Item {
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
  profile: Profile
}

export interface CommunitySubject {
  id: number
  communityId: number
  centerId: number
  studyId: number
  folderId: number
  course: number
  numFiles: number
  deleted: boolean
  verified: boolean
  enabled: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  createdBy: null
  subject: Subject
}

export interface Subject {
  id: number
  name: string
  link: string
  slug: string
  verified: boolean
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

export interface Profile {
  id: number
  nickname: string
  popularity: number
  countryId: number
  partnerType: number
  defaultCommunityId: number
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  avatarUrl: string
  fallbackAvatarUrl: string
  money: number
  accumulated: number
  totalMoney: number
  displayMoney: boolean
  isTeacher: boolean
}

export interface Pagination {
  type: string
  size: number
  offset: number
}
