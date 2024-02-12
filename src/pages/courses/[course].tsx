import Course from '@/components/Page/Course'
import Sidebar from '@/components/Sidebar/Sidebar'
import { WuolahUser } from '@/types/WuolahUser'
import { fetchSelfData } from '@/utils/data'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CoursePage () {
  const [selfData, setSelfData] = useState<WuolahUser | null>(null)
  const pathname = usePathname()

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
      <Course
        path={pathname}
      />
      <Sidebar
        user={selfData}
      />
    </div>
  )
}
