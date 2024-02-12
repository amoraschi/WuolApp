export interface Files {
  items: Item[]
  pagination: Pagination
  totalItems: number
}

export interface Item {
  id: string
  entityId: number
  entityType: EntityType
  entitySubtype: EntitySubtype
  slug?: string
  title: string
  isAnonymous: boolean
  ownerId: number
  teacher: null | string
  isMonetizable?: boolean
  generatedMoney: null
  createdAt: Date
  thumbnailUrl?: string
  extension?: string
  stats: Stats
  segmentation: Segmentation
  profile: Profile
  metadata?: Metadata
}

export enum EntitySubtype {
  Apuntes = 'apuntes',
  Examenes = 'examenes',
  Trabajos = 'trabajos',
}

export enum EntityType {
  Document = 'document',
  Upload = 'upload',
}

export interface Metadata {
  documentId: number
  documentSlug: string
  documentStats: Stats
  documentCreatedAt: Date
}

export interface Stats {
  numBookmarks?: number
  numDownloads: number
  numViews: number
  numPaidDownloads?: number
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

export interface Segmentation {
  communityId: number
  subjectId: number
  course: number
}

export interface Pagination {
  type: string
  size: number
  offset: number
}
