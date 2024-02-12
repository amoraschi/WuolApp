import { useEffect, useState } from 'react'
import { Teachers } from '@/types/Teachers'
import { fetchCourseTeachers } from '@/utils/data'
import CourseTeacher from './CourseTeacher'
import { AiOutlineLoading } from 'react-icons/ai'

interface CourseTeachersProps {
  id: number
}

export default function CourseTeachers ({ id }: CourseTeachersProps) {
  const [courseTeachers, setCourseTeachers] = useState<Teachers | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getCourseTeachers = async () => {
      const storedCourseTeachers = localStorage.getItem(`teachers-${id}`)
      if (storedCourseTeachers != null) {
        console.log(JSON.parse(storedCourseTeachers))
        setCourseTeachers(JSON.parse(storedCourseTeachers))
        return
      }

      const res = await fetchCourseTeachers(`${id}`, '5', abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem(`teachers-${id}`, JSON.stringify(res))
      setCourseTeachers(res)
    }

    getCourseTeachers()
    console.log(courseTeachers)

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div
      className={`
        w-fit
        mt-4
      `}
    >
      {
        courseTeachers?.items?.length === 0 ? (
          <></>
        ) : (
          <>
            <span
              className={`
                text-md
                font-semibold
                text-gray-700
              `}
            >
              PROFESORES
            </span>
            {
              courseTeachers == null ? (
                <div
                  className={`
                    m-2
                  `}
                >
                  <AiOutlineLoading
                    className={`
                      animate-spin
                      text-4xl
                      text-blue-700
                    `}
                  />
                </div>
              ) : (
                courseTeachers.items.map((user, index) => (
                  <CourseTeacher
                    key={index}
                    teacher={user}
                  />
                ))
              )
            }
          </>
        )
      }
    </div>
  )
}
