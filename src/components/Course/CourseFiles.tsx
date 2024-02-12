import { useEffect, useState } from 'react'
import CourseTeacher from './CourseTeacher'
import { Files } from '@/types/Files'
import { fetchCourseFiles } from '@/utils/data'
import CourseFile from './CourseFile'
import { AiOutlineLoading } from 'react-icons/ai'

interface CourseFilesProps {
  course: number
  subjectId: number
}

const tildeRegex = /[\u0300-\u036f]/g

export default function CourseFiles ({ course, subjectId }: CourseFilesProps) {
  const [courseFiles, setCourseFiles] = useState<Files | null>(null)
  const [searchResults, setSearchResults] = useState<Files | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (courseFiles == null) {
      return
    }

    const input = e.target.value.toLowerCase().normalize('NFD').replace(tildeRegex, '')
    const results = courseFiles.items.filter((file) => file.title.normalize('NFD').replace(tildeRegex, '').toLowerCase().includes(input))
    setSearchResults({
      ...courseFiles,
      items: results
    })
  }


  useEffect(() => {
    const abortController = new AbortController()
    const getCourseFiles = async () => {
      const storedCourseFiles = localStorage.getItem(`files-${subjectId}`)
      if (storedCourseFiles != null) {
        console.log(JSON.parse(storedCourseFiles))
        setCourseFiles(JSON.parse(storedCourseFiles))
        return
      }

      const res = await fetchCourseFiles(`${course}`, `${subjectId}`, '20', abortController.signal)
      if (res == null) {
        return
      }

      console.log(res)
      localStorage.setItem(`files-${subjectId}`, JSON.stringify(res))
      setCourseFiles(res)
    }

    getCourseFiles()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div
      className={`
        flex
        flex-grow
        flex-col
        my-4
        mx-2
      `}
    >
      <span
        className={`
          text-md
          font-semibold
          text-gray-700
        `}
      >
        ARCHIVOS
      </span>
      <input
        type='text'
        placeholder='Buscar'
        className={`
          p-2
          my-2
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
        courseFiles == null ? (
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
          <div
            className={`
              grid
              gap-2
            `}
          >
            {
              searchResults == null ? (
                courseFiles.items.map((file, index) => (
                  <CourseFile
                    key={index}
                    file={file}
                  />
                ))
              ) : (
                searchResults.items.map((file, index) => (
                  <CourseFile
                    key={index}
                    file={file}
                  />
                ))
              )
            }
          </div>
        )
      }
    </div>
  )
}
