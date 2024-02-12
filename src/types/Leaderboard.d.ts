export interface Leaderboard {
  items: Item[]
  pagination: Pagination
}

export interface Item {
  value: number
  rank: number
  userId: number
  segmentation: Segmentation
  user: User
}

export interface Segmentation {
  communityId: number
}

export interface User {
  id: number
  nickname: string
  popularity: number
  countryId: number
  partnerType: number
  defaultCommunityId: number
  createdAt: string
  updatedAt: string
  deleted: boolean
  avatarUrl: string
  fallbackAvatarUrl: string
  money?: number
  accumulated?: number
  totalMoney?: number
  displayMoney: boolean
  isTeacher: boolean
}

export interface Pagination {
  page: number
  pageSize: number
  type: string
}
