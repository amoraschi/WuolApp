import { useEffect, useState } from 'react'
import User from './User'
import { fetchLeaderboard, fetchWithAuth } from '@/utils/data'
import { Leaderboard, LeaderboardUser } from '@/types/Rankings'
import { currencies, endpoints } from '@/utils/constants'
import { Teacher, Teachers } from '@/types/Teachers'
import MediumText from '../Text/MediumText'

interface UserListProps {
  name: string
  type: string
  communityId?: number
  subjectId?: number
  id?: number
}

export default function UserList ({ name, type, communityId, subjectId, id }: UserListProps) {
  const [userList, setUserList] = useState<Leaderboard | Teachers | null>(null)

  useEffect(() => {
    const storedUserList = localStorage.getItem(type === 'RANKINGS' ? `rankings-${communityId}-${subjectId}` : `teachers-${id}`)
    if (storedUserList != null) {
      console.log(JSON.parse(storedUserList))
      setUserList(JSON.parse(storedUserList))
      return
    }

    const abortController = new AbortController()
    const getUserList = async () => {
      const params: Record<string, string> = {
        RANKINGS: `?populate[0]=user&filter[communityId]=${communityId}${subjectId != null ? `&filter[subjectId]=${subjectId}&filter[criteria]=subject` : '&filter[criteria]=community'}&pagination[pageSize]=`,
        TEACHERS: `?communitySubjectId=${id}&pagination[pageSize]=`
      }

      const URL = `${endpoints[type]}${params[type]}`

      const res = await fetchWithAuth(URL, abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem(type === 'RANKINGS' ? `rankings-${communityId}-${subjectId}` : `teachers-${id}`, JSON.stringify(res))
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
        userList == null ? (
          <></>
        ) : (
          <div
            className={`
              w-fit
            `}
          >
            <MediumText
              value={name}
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
                    user={type === 'RANKINGS' ? (user as LeaderboardUser).user : (user as Teacher).profile}
                    xp={type === 'RANKINGS' ? (user as LeaderboardUser).value : (user as Teacher).profile.popularity}
                  />
                ))
              }
            M</div>
          </div>
        )
      }
    </>
  )
}
