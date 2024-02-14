import { Pagination, Segmentation } from './Common'
import { Subject } from './Community'
import { User } from './User'

export interface Files {
  items: File[]
  pagination: Pagination
  totalItems: number
}

export interface File {
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
  createdAt: Date
  thumbnailUrl?: string
  extension?: string
  stats: Stats
  segmentation: Segmentation
  profile: User
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
