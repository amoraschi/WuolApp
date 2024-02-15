import Course from '@/components/Page/Course'
import Sidebar from '@/components/Sidebar/Sidebar'
import { User } from '@/types/User'
import { handleSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'

export default function CoursePage () {
  const [selfData, setSelfData] = useState<User | null>(null)
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getSelfData = async () => {
      await handleSelfData(setSelfData, abortController.signal)
    }

    getSelfData()

    const storedId = localStorage.getItem('selected-course')
    if (storedId != null) {
      setId(storedId)
    }

    return () => {
      abortController.abort()
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
      <Sidebar
        user={selfData}
      />
    </main>
  )
}
