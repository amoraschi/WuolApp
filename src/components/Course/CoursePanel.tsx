import { CourseData } from '@/types/Courses'
import { fetchCourses } from '@/utils/data'
import { deltaDays } from '@/utils/math'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GoLink } from 'react-icons/go'
import CourseLeaderboard from './CourseLeaderboard'
import CourseTeachers from './CourseTeachers'
import CourseFiles from './CourseFiles'
import { WuolahUser } from '@/types/User'
import UserList from '../User/UserList'

interface CoursePanelProps {
  id: string
}

export default function CoursePanel ({ id }: CoursePanelProps) {
  const [course, setCourse] = useState<CourseData | null>(null)

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses')
    if (storedCourses != null) {
      const courses = JSON.parse(storedCourses)
      const course = courses.data.find((course: CourseData) => course.id === parseInt(id))
      setCourse(course)
      return
    }

    const abortController = new AbortController()
    const getSelfData = async () => {
      const res = await fetchCourses('9999', abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem('courses', JSON.stringify(res))
      const course = res.data.find((course: CourseData) => course.id === parseInt(id))
      setCourse(course != null ? course : null)
    }

    getSelfData()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div
      className={`
        absolute
        inset-0
        shadow-md
        left-64
        h-full
        flex
        flex-col
        overflow-y-auto
      `}
    >
      <Link
        href='/courses'
        className={`
          text-blue-500
          m-4
          w-fit
          hover:underline

        `}
      >
        Volver
      </Link>
      {
        course == null ? (
          <></>
        ) : (
          <div>
            <div
              className={`
                flex
                flex-col
              `}
            >
              <div
                className={`
                  flex
                  justify-between
                  items-center
                  px-4
                `}
              >
                <span
                  className={`
                    text-2xl
                    text-black
                    font-semibold
                  `}
                >
                  {course.subject.name}
                </span>
                <span
                  className={`
                    text-sm
                    text-gray-500
                    cursor-pointer
                    hover:text-black
                    hover:scale-110
                    transition-all
                    duration-200
                  `}
                >
                  <GoLink />
                </span>
              </div>
              <span
                className={`
                  text-sm
                  text-gray-500
                  bg-gray-200
                  rounded-sm
                  w-fit
                  px-1
                  mx-4
                  my-1
                `}
              >
                Creado hace {deltaDays(new Date(course.createdAt))} días
              </span>
            </div>
            <div
              className={`
                flex
                flex-row
                w-full
              `}
            >
              <div
                className={`
                  grid
                  m-4
                  gap-4
                  h-fit
                `}
              >
                <UserList
                  name='RANKING'
                  type='RANKINGS'
                  subjectId={course.subjectId}
                  communityId={course.communityId}
                />
                <UserList
                  name='PROFESORES'
                  type='TEACHERS'
                  id={course.id}
                />
              </div>
              <CourseFiles
                course={course.course}
                subjectId={course.subjectId}
              />
            </div>
          </div>
        )
      }
    </div>
  )
}
