import Sidebar from '@/components/Sidebar/Sidebar'
import { User } from '@/types/User'
import { handleSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'

export default function FilesPage () {
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
      <Sidebar
        user={selfData}
      />
    </main>
  )
}
