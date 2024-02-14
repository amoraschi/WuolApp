import Course from '@/components/Page/Course'
import Sidebar from '@/components/Sidebar/Sidebar'
import { User } from '@/types/User'
import { fetchSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'

export default function CoursePage () {
  const [selfData, setSelfData] = useState<User | null>(null)
  const [id, setId] = useState<string | null>(null)

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

    const storedId = localStorage.getItem('selected')
    console.log('Loading', storedId)
    if (storedId != null) {
      setId(storedId)
      console.log(storedId)
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
