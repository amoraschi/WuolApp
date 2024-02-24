import { useEffect, useState } from 'react'
import { fetchWithAuth } from '@/utils/data'
import { endpoints } from '@/utils/constants'
import { TeacherData, TeachersData } from '@/types/Teachers'
import { Ranking, Rankings } from '@/types/Rankings'
import MediumText from '@/components/Text/MediumText'
import User from '@/components/User/User'

interface UserListProps {
  name: string
  type: string
  communityId?: number
  subjectId?: number
  id?: number
  size?: number
}

export default function UserList ({ name, type, communityId, subjectId, id, size }: UserListProps) {
  const [userList, setUserList] = useState<Rankings | TeachersData | null>(null)

  useEffect(() => {
    const storedUserList = localStorage.getItem(type === 'RANKINGS' ? `rankings-${communityId}-${subjectId ?? 'dashboard'}` : `teachers-${id}`)
    if (storedUserList != null) {
      setUserList(JSON.parse(storedUserList))
      return
    }

    const abortController = new AbortController()
    const getUserList = async () => {
      const params: Record<string, string> = {
        RANKINGS: `?populate[0]=user&filter[communityId]=${communityId}${subjectId != null ? `&filter[subjectId]=${subjectId}&filter[criteria]=subject` : '&filter[criteria]=community'}&pagination[pageSize]=${size ?? ''}`,
        TEACHERS: `?communitySubjectId=${id}&status=active&pagination[pageSize]=${size ?? ''}`
      }

      const URL = `${endpoints[type]}${params[type]}`

      const res = await fetchWithAuth(URL, abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem(type === 'RANKINGS' ? `rankings-${communityId}-${subjectId ?? 'dashboard'}` : `teachers-${id}`, JSON.stringify(res))
      setUserList(res)
    }

    getUserList()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <>
      {
        userList == null || userList.items.length === 0 ? (
          <></>
        ) : (
          <div
            className={`
              w-fit
            `}
          >
            <MediumText
              content={name}
            />
            <div
              className={`
                flex
                flex-col
                pt-2
                gap-2
              `}
            >
              {
                userList.items.map((user, index) => (
                  <User
                    key={index}
                    user={type === 'RANKINGS' ? (user as Ranking).user : (user as TeacherData).profile}
                    xp={type === 'RANKINGS' ? (user as Ranking).value : (user as TeacherData).profile.popularity}
                    rank={type === 'RANKINGS' ? (user as Ranking).rank : undefined}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </>
  )
}
