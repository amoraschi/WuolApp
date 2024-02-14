import { Segmentations } from './Common'

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
  metadata: CommunityMetadata
  shortName: null
  enabled: boolean
  deleted: boolean
  blocked: boolean
  createdBy: null
  numUsers: number
  courses: number
  courseGroups: CourseGroups[]
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

export interface CourseGroups {
  order: number
  courseId: number
  defaultTolgeeKeyPrefix: string
}

export interface Order {
  default: number
  pfCommunityHeader: number
}

export interface Visible {
  default: boolean
  pfCommunityHeader: boolean
}

export interface CommunityMetadata {
  pfIsStudyGrouping: boolean
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
  createdAt: string
  updatedAt: string
  deletedAt: string
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
