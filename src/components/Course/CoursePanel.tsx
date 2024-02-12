import { CourseData } from '@/types/Courses'
import { fetchCourses } from '@/utils/data'
import { deltaDays } from '@/utils/math'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GoLink } from 'react-icons/go'

interface CoursePanelProps {
  path: string
}

export default function CoursePanel ({ path }: CoursePanelProps) {
  const [course, setCourse] = useState<CourseData | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getSelfData = async () => {
      const storedCourses = localStorage.getItem('courses')
      if (storedCourses != null) {
        const courses = JSON.parse(storedCourses)
        console.log(courses.data.length)
        const course = courses.data.find((course: CourseData) => {
          console.log(`/courses/${course.id}`, path)
          return `/courses/${course.id}` === path
        })
        setCourse(course)
        return
      }

      const res = await fetchCourses('9999', abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem('courses', JSON.stringify(res))
      const course = res.data.find((course: CourseData) => `/courses/${course.id}` === path)
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
                  // onClick={onClick}
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
          </div>
        )
      }
    </div>
  )
}
