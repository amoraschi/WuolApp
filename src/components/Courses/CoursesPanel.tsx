import { useEffect, useState } from 'react'
import { Courses } from '@/types/Courses'
import { fetchCourses } from '@/utils/data'
import CoursesTab from './CoursesTab'

const tildeRegex = /[\u0300-\u036f]/g

export default function CoursesPanel () {
  const [courses, setCourses] = useState<Courses | null>(null)
  const [searchResults, setSearchResults] = useState<Courses | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (courses == null) {
      return
    }

    const input = e.target.value.toLowerCase().normalize('NFD').replace(tildeRegex, '')
    const results = courses.data.filter((course) => course.subject.name.normalize('NFD').replace(tildeRegex, '').toLowerCase().includes(input))
    setSearchResults({
      ...courses,
      data: results
    })
  }

  useEffect(() => {
    const abortController = new AbortController()
    const getCourses = async () => {
      const storedCourses = localStorage.getItem('courses')
      if (storedCourses != null) {
        setCourses(JSON.parse(storedCourses))
        return
      }

      const res = await fetchCourses('250', abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem('courses', JSON.stringify(res))
      setCourses(res)
    }

    getCourses()

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
      <input
        type='text'
        placeholder='Buscar'
        className={`
          p-4
          m-4
          text-black
          border-b
          border-gray-300
          outline-none
          focus:border-blue-700
          transition-all
          duration-200
        `}
        onChange={onChange}
      />
      {
        courses == null ? (
          <></>
        ) : (
          searchResults == null ? (
            courses.data.map((course) => (
              <CoursesTab
                key={course.id}
                course={course}
              />
            ))
          ) : (
            searchResults.data.map((course) => (
              <CoursesTab
                key={course.id}
                course={course}
              />
            ))
          )
        )
      }
    </div>
  )
}
