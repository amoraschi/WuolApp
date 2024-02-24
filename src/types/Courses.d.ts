import { Pagination, PaginationObject } from '@/types/Pagination'
import { Subject } from '@/types/Community'

export interface Courses {
  data: Course[]
  meta: PaginationObject
}

export interface Course {
  id: number
  communityId: number
  centerId: number
  studyId: number
  subjectId: number
  course: number
  numFiles: number
  verified: boolean
  enabled: boolean
  deleted: boolean
  createdAt: string
  updatedAt: string
  subject: Subject
}
