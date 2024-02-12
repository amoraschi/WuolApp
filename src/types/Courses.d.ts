export interface Courses {
  data: CourseData[]
  meta: Meta
}

export interface CourseData {
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

export interface Subject {
  id: number
  name: string
  link: string
  slug: string
  verified: boolean
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
}
