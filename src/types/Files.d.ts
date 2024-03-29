import { Pagination, Segmentation } from '@/types/Common'
import { Community, Subject } from '@/types/Community'
import { User } from '@/types/User'

export interface Files {
  items: SingleFile[]
  pagination: Pagination
  totalItems: number
}

export interface SingleFile {
  id: string
  entityId: number
  entityType: EntityType
  entitySubtype: EntitySubtype
  slug?: string
  title?: string
  description?: string
  isAnonymous: boolean
  ownerId: number
  teacher: null | string
  isMonetizable?: boolean
  generatedMoney: null
  createdAt: string
  thumbnailUrl?: string
  extension?: string
  stats: Stats
  segmentation: Segmentation
  profile?: User
  metadata?: FileMetadata
  contentUrl?: string
  attachedFileUrl?: null
  subject?: Subject
}

export enum EntitySubtype {
  Apuntes = 'apuntes',
  Examenes = 'examenes',
  Trabajos = 'trabajos',
  Doubt = 'doubt',
  Publication = 'publication'
}

export enum EntityType {
  Document = 'document',
  Upload = 'upload',
  Social = 'social'
}

export interface FileMetadata {
  documentId: number
  documentSlug: string
  documentStats: Stats
  documentCreatedAt: Date
}

export interface Stats {
  numBookmarks?: number
  numDownloads?: number
  numViews?: number
  numPaidDownloads?: number
  numComments?: number
  numLikes?: number
  numDislikes?: number
}

export interface FolderData {
  data: FileData[]
  meta: Pagination
}

export interface FileData {
  id: number
  createdAt: string
  updatedAt: string
  deleted: boolean
  category: EntitySubtype
  name: string
  slug: string
  extension: string
  fileType: string
  teacher: string
  size: number
  isAnonymous: boolean
  isMonetizable: boolean
  numPages: number
  numPreviews: number
  numViews: number
  numDownloads: number
  numPaidDownloads: number
  numPremiumDownloads: number
  numBookmarks: number
  numLikes: number
  course: number
  uploadId: number
  userId: number
  communityId: number
  subjectId: number
  centerId: number
  studyId: number
  moneyBooster: number
  user: User
  study: FileStudy
  subject: FileStudy
  community: Community
}

export interface FileStudy {
  id: number
  slug: string
  name: string
  shortName: null | string
  studyBranchId?: number
  verified?: boolean
}

export interface FileDownloadData {
  extension: string
  url: string
  viewId: string
}
