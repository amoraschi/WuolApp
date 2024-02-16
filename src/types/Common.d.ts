import { UserBookmarks } from './User'

export interface WuolahLogin {
  accessToken: string
  refreshToken: string
  expires: string
}

export interface UserLogin {
  username: string
  password: string
  accessToken: string
  refreshToken: string
  expires: string
}

export interface Pagination {
  type?: string
  size?: number
  offset?: number
  page?: number
  pageSize?: number
  pageCount?: number
}

export interface Segmentations {
  country: Segmentation
  countryCode: Segmentation
  city: Segmentation
  university: Segmentation
  studyType: Segmentation
  study: Segmentation
  center: Segmentation
}

export interface Segmentation {
  id?: number
  order?: Order
  visible?: Visible
  item?: SegmentationItem
  communityId?: number
  folderId?: number
  subjectId?: number | null
  course?: number
}

export interface SegmentationItem {
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

export interface PaginationObject {
  pagination: Pagination
}

interface Config {
  user: ConfigUser
}

interface ConfigUser {
  username: string
  password: string
  accessToken: string
  refreshToken: string
  expires: string
}
