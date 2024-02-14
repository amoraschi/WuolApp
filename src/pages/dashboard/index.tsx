import { fetchSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import { User } from '@/types/User'
import DashboardPanel from '@/components/Dashboard/DashboardPanel'

export default function DashboardPage () {
  const [selfData, setSelfData] = useState<User | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getSelfData = async () => {
      const storedSelfData = localStorage.getItem('selfData')
      if (storedSelfData != null) {
        setSelfData(JSON.parse(storedSelfData))
        return
      }

      const res = await fetchSelfData(abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem('selfData', JSON.stringify(res))
      setSelfData(res)
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
      <DashboardPanel
        user={selfData}
      />
      <Sidebar
        user={selfData}
      />
    </main>
  )
}
