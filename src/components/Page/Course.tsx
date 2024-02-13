import { fetchSelfData } from '@/utils/data'
import CoursePanel from '../Course/CoursePanel'
import Sidebar from '../Sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { WuolahUser } from '@/types/WuolahUser'

interface CourseProps {
  id: string
}

export default function Course ({ id }: CourseProps) {
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
        id={id}
      />
      <Sidebar
        user={selfData}
      />
    </div>
  )
}
