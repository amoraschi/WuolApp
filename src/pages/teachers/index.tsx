import { useEffect, useState } from 'react'
import { handleSelfData } from '@/utils/data'
import { User } from '@/types/User'
import Teachers from '@/components/Page/Teachers'
import Sidebar from '@/components/Sidebar/Sidebar'

export default function TeachersPage () {
  const [selfData, setSelfData] = useState<User | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getData = async () => {
      await handleSelfData(setSelfData, abortController.signal)
    }

    getData()

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
        selfData == null ? (
          <></>
        ) : (
          <Teachers
            selfData={selfData}
          />
        )
      }
      <Sidebar />
    </main>
  )
}
