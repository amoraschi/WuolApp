import { handleSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import { User } from '@/types/User'
import Courses from '@/components/Page/Courses'

export default function CoursesPage () {
  const [selfData, setSelfData] = useState<User | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getSelfData = async () => {
      await handleSelfData(setSelfData, abortController.signal)
    }

    getSelfData()

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
      <Courses />
      <Sidebar
        user={selfData}
      />
    </main>
  )
}
