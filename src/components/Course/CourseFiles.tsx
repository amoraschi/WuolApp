import { useState } from 'react'
import { Files } from '@/types/Files'
import CourseFile from './CourseFile'
import MediumText from '../Text/MediumText'
import LoadingIcon from '../Icons/LoadingIcon'
import { fetchCourseFiles } from '@/utils/data'

interface CourseFilesProps {
  course: number
  subjectId: number
}

const tildeRegex = /[\u0300-\u036f]/g

export default function CourseFiles ({ course, subjectId }: CourseFilesProps) {
  const [searchResults, setSearchResults] = useState<Files | null>(null)
  const [searching, setSearching] = useState(false)

  let searchTimeout: NodeJS.Timeout | null = null
  let abortController: AbortController | null = null

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearching(true)
    const input = e.target.value.toLowerCase().normalize('NFD').replace(tildeRegex, '')

    if (input === '') {
      setSearching(false)
      setSearchResults(null)
      return
    }

    if (searchTimeout != null) {
      clearTimeout(searchTimeout)
    }

    if (abortController != null) {
      abortController.abort('Abort previous search')
    }

    searchTimeout = setTimeout(() => {
      const searchInput = async () => {
        abortController = new AbortController()
        const res = await fetchCourseFiles(`${course}`, `${subjectId}`, input, '50', abortController.signal)
        abortController = null
        if (res == null) {
          setSearching(false)
          return
        }

        setSearching(false)
        setSearchResults(res)
      }

      searchInput()
    }, 1000)
  }

  return (
    <div
      className={`
        flex
        flex-grow
        flex-col
      `}
    >
      <MediumText
        content='ARCHIVOS'
      />
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
      {/* {
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
      } */}
      {
        searching ? (
          <LoadingIcon />
        ) : (
          searchResults == null ? (
            <div
              className={`
                  m-2
                `}
            >
              <span
                className={`
                    text-gray-500
                  `}
              >
                Escribe algo para buscar
              </span>
            </div>
          ) : (
            <div
              className={`
                grid
                gap-2
              `}
            >
              {
                searchResults.items.length === 0 ? (
                  <span
                    className={`
                      text-gray-500
                      m-2
                    `}
                  >
                    No se encontraron resultados
                  </span>
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
        )
      }
    </div>
  )
}
