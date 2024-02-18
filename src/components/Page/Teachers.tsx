import { TeachersData } from '@/types/Teachers'
import MediumText from '../Text/MediumText'
import Teacher from '../Teachers/Teacher'
import { useEffect, useState } from 'react'
import { fetchWithAuth } from '@/utils/data'
import { endpoints } from '@/utils/constants'
import { User } from '@/types/User'

interface TeachersProps {
  selfData: User
}

interface TeachersState {
  community: TeachersData
  global: TeachersData
}

export default function Teachers ({ selfData }: TeachersProps) {
  const [teachers, setTeachers] = useState<TeachersState | null>(null)

  useEffect(() => {
    const storedTeachers = localStorage.getItem('teachers')
    if (storedTeachers != null) {
      setTeachers(JSON.parse(storedTeachers))
      return
    }

    const abortController = new AbortController()
    const fetchTeachers = async () => {
      const paramCommunity = `?communityId=${selfData.defaultCommunityId}&status=active&pagination[pageSize]=25`
      const paramGlobal = `?status=active&pagination[pageSize]=20`
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

    fetchTeachers()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div
      className={`
        absolute
        inset-0
        shadow-md
        left-64
        h-full
        flex
        flex-col
        overflow-y-auto
        p-8
        gap-4
      `}
    >
      <MediumText
        content='PROFESORES EN TU COMUNIDAD'
      />
      <div
        className={`
          grid
          grid-cols-4
          gap-4
        `}
      >
        {
          teachers != null && (
            teachers.community.items.map((teacher, index) => (
              <Teacher
                key={index}
                teacher={teacher}
              />
            ))
          )
        }
      </div>
      <MediumText
        content='OTROS PROFESORES DESTACADOS'
      />
      <div
        className={`
          grid
          grid-cols-4
          gap-4
        `}
      >
        {
          teachers != null && (
            teachers.global.items.map((teacher, index) => (
              <Teacher
                key={index}
                teacher={teacher}
              />
            ))
          )
        }
      </div>
    </div>
  )
}
