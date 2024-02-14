import { fetchSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import { WuolahUser } from '@/types/User'
import DashboardPanel from '../Dashboard/DashboardPanel'

export default function Dashboard () {
  const [selfData, setSelfData] = useState<WuolahUser | null>(null)

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
    <div
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
    </div>
  )
}
