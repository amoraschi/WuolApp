export interface NewPosts {
  items: Item[]
  pagination: Pagination
  totalItems: number
}

export interface Item {
  id: string
  entityId: number
  entityType: EntityType
  entitySubtype: EntitySubtype
  title?: string
  isAnonymous: boolean
  description: string
  ownerId: number
  createdAt: string
  contentUrl?: string
  attachedFileUrl: null
  stats: Stats
  segmentation: Segmentation
  profile: Profile
  subject?: Subject
}

export enum EntitySubtype {
  Doubt = "doubt",
  Publication = "publication",
}

export enum EntityType {
  Social = "social",
}

export interface Profile {
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

export interface Segmentation {
  communityId: number
  subjectId: number | null
}

export interface Stats {
  numComments: number
  numLikes: number
  numDislikes: number
}

export interface Subject {
  id: number
  name: string
  link: string
  slug: string
  verified: boolean
}

export interface Pagination {
  type: string
  size: number
  offset: number
}
