import { useEffect, useState } from 'react'
import User from './User'
import { fetchWithAuth } from '@/utils/data'
import { endpoints } from '@/utils/constants'
import { Teacher, Teachers } from '@/types/Teachers'
import MediumText from '../Text/MediumText'
import { Ranking, Rankings } from '@/types/Rankings'

interface UserListProps {
  name: string
  type: string
  communityId?: number
  subjectId?: number
  id?: number
  size?: number
}

export default function UserList ({ name, type, communityId, subjectId, id, size }: UserListProps) {
  const [userList, setUserList] = useState<Rankings | Teachers | null>(null)

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
        TEACHERS: `?communitySubjectId=${id}&pagination[pageSize]=${size ?? ''}`
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
                    user={type === 'RANKINGS' ? (user as Ranking).user : (user as Teacher).profile}
                    xp={type === 'RANKINGS' ? (user as Ranking).value : (user as Teacher).profile.popularity}
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
