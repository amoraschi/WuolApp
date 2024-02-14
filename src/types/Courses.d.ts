import { Pagination } from './Common'
import { Subject } from './Community'

export interface Courses {
  data: Course[]
  meta: CourseMetadata
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

export interface CourseMetadata {
  pagination: Pagination
}
