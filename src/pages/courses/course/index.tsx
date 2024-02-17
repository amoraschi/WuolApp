import Course from '@/components/Page/Course'
import Sidebar from '@/components/Sidebar/Sidebar'
import { User } from '@/types/User'
import { handleSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'

export default function CoursePage () {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    const storedId = localStorage.getItem('selected-course')
    if (storedId != null) {
      setId(storedId)
    }
  }, [])

  return (
    <main
      className={`
        absolute
        inset-0
        bg-white
      `}
    >
      {
        id == null ? (
          <></>
        ) : (
          <Course
            id={id}
          />
        )
      }
      <Sidebar />
    </main>
  )
}
