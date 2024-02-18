import Teachers from '@/components/Page/Teachers'
import Sidebar from '@/components/Sidebar/Sidebar'
import { TeachersData } from '@/types/Teachers'
import { User } from '@/types/User'
import { endpoints } from '@/utils/constants'
import { fetchSelfData, fetchWithAuth, getSelfData, handleSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'

interface TeachersPageData {
  community: TeachersData
  global: TeachersData
}

export default function TeachersPage () {
  const [selfData, setSelfData] = useState<User | null>(null)
  const [teachers, setTeachers] = useState<TeachersPageData | null>(null)

  useEffect(() => {
    const storedTeachers = localStorage.getItem('teachers')
    if (storedTeachers != null) {
      setTeachers(JSON.parse(storedTeachers))
      return
    }

    const abortController = new AbortController()
    const getData = async () => {
      if (selfData == null) {
        const storedSelfData = await getSelfData()
        if (storedSelfData != null) {
          setSelfData(storedSelfData)
          return
        }
      }

      if (selfData == null) {
        return
      }

      const paramCommunity = `?communityId=${selfData.defaultCommunityId}&status=active&pagination[pageSize]=25`
      const paramGlobal = `?status=active&pagination[pageSize]=25`
      const resCommunity = await fetchWithAuth(`${endpoints['TEACHERS']}${paramCommunity}`, abortController.signal)
      const resGlobal = await fetchWithAuth(`${endpoints['TEACHERS']}${paramGlobal}`, abortController.signal)
      if (resCommunity == null || resGlobal == null) {
        return
      }

      console.log(resCommunity.items.length, resGlobal.items.length)
      setTeachers({
        community: resCommunity,
        global: resGlobal
      })

      localStorage.setItem('teachers', JSON.stringify({
        community: resCommunity,
        global: resGlobal
      }))
    }

    getData()

    return () => {
      abortController.abort()
    }
  }, [selfData])

  return (
    <main
      className={`
        absolute
        inset-0
        bg-white
      `}
    >
      {
        teachers == null ? (
          <></>
        ) : (
          <Teachers
            community={teachers.community}
            global={teachers.global}
          />
        )
      }
      <Sidebar />
    </main>
  )
}
