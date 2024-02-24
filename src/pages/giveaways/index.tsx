import { useEffect, useState } from 'react'
import { handleSelfData } from '@/utils/data'
import { User } from '@/types/User'
import Giveaways from '@/components/Page/Giveaways'
import Sidebar from '@/components/Sidebar/Sidebar'

export default function GiveawaysPage () {
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
          <Giveaways
            selfData={selfData}
          />
        )
      }
      <Sidebar />
    </main>
  )
}
