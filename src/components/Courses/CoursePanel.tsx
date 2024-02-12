import { CourseData } from '@/types/Courses'
import { fetchCourses } from '@/utils/data'
import { useEffect, useState } from 'react'

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
      {
        course == null ? (
          <></>
        ) : (
          <div>
            <span
              className={`
                text-2xl
                text-black
                font-bold
                p-4
              `}
            >
              {course.subject.name}
            </span>
          </div>
        )
      }
    </div>
  )
}
