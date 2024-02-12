import { fetchSelfData } from '@/utils/data'
import CoursePanel from '../Courses/CoursePanel'
import Sidebar from '../Sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { WuolahUser } from '@/types/WuolahUser'

interface CourseProps {
  path: string
}

export default function Course ({ path }: CourseProps) {
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
      <CoursePanel
        path={path}
      />
      <Sidebar
        user={selfData}
      />
    </div>
  )
}
