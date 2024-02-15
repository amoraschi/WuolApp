import Link from 'next/link'
import { useEffect, useState } from 'react'
import { open } from '@tauri-apps/api/shell'
import { Course } from '@/types/Courses'
import { fetchCourses } from '@/utils/data'
import { deltaDays } from '@/utils/math'
import CourseFiles from '../Course/CourseFiles'
import UserList from '../User/UserList'
import SmallTextBox from '../Text/SmallTextBox'
import LargeText from '../Text/LargeText'
import LinkIcon from '../Icons/LinkIcon'
import LinkText from '../Text/LinkText'

interface CourseProps {
  id: string
}

export default function Course ({ id }: CourseProps) {
  const [course, setCourse] = useState<Course | null>(null)

  const onClick = () => {
    open(`https://wuolah.com/apuntes/${course?.subject?.slug ?? ''}`)
  }

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses')
    if (storedCourses != null) {
      const courses = JSON.parse(storedCourses)
      const course = courses.data.find((course: Course) => course.id === parseInt(id))
      console.log(course)
      setCourse(course)
      return
    }

    const abortController = new AbortController()
    const getCourse = async () => {
      const res = await fetchCourses('9999', abortController.signal)
      console.log(res)
      if (res == null) {
        return
      }

      localStorage.setItem('courses', JSON.stringify(res))
      const course = res.data.find((course: Course) => course.id === parseInt(id))
      setCourse(course != null ? course : null)
    }

    getCourse()

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
        px-8
        py-4
        gap-2
      `}
    >
      <LinkText
        href='/courses'
        content='Volver'
      />
      {
        course == null ? (
          <></>
        ) : (
          <div>
            <div
              className={`
                flex
                flex-col
                gap-1
              `}
            >
              <div
                className={`
                  flex
                  justify-between
                  items-center
                `}
              >
                <LargeText
                  content={course.subject.name}
                />
                <LinkIcon
                  onClick={onClick}
                />
              </div>
              <SmallTextBox
                content={`Creado hace ${deltaDays(new Date(course.createdAt))} días`}
              />
            </div>
            <div
              className={`
                flex
                flex-row
                w-full
                gap-4
                py-4
              `}
            >
              <div
                className={`
                  hidden
                  lg:grid
                  h-fit
                  gap-4
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
