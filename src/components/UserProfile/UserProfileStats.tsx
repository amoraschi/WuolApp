import { useEffect, useState } from 'react'
import { fetchWithAuth } from '@/utils/data'
import { User } from '@/types/User'
import { UserStats } from '@/types/User'
import UserProfileStat from '@/components/UserProfile/UserProfileStat'

interface UserProfileStatsProps {
  user: User
}

export default function UserProfileStats ({ user }: UserProfileStatsProps) {
  const [userStats, setUserStats] = useState<UserStats | null>(null)

  useEffect(() => {
    const storedUserStats = localStorage.getItem(`userStats-${user.id}`)
    if (storedUserStats != null) {
      setUserStats(JSON.parse(storedUserStats))
      return
    }

    const abortController = new AbortController()
    const getUserStats = async () => {
      const res = await fetchWithAuth(`https://api.wuolah.com/v2/user-stats/${user.id}`, abortController.signal)
      if (res == null) {
        return
      }

      setUserStats(res)
    }

    getUserStats()

    return () => {
      abortController.abort()
    }
  }, [user.id])

  return (
    <>
      <div
        className={`
          grid
          grid-cols-3
          gap-2
          mt-4
        `}
      >
        {
          userStats == null ? (
            <></>
          ) : (
            <>
              <UserProfileStat
                name='Publicaciones'
                value={`${userStats.numFiles}`}
                box
              />
              <UserProfileStat
                name='Interacciones'
                value={`${userStats.numPaidDownloads}`}
                box
              />
              <UserProfileStat
                name='XP'
                value={`${user.popularity}`}
                box
              />
            </>
          )
        }
      </div>
      <div
        className={`
          flex
          gap-1
          mt-4
        `}
      >
        {
          userStats == null ? (
            <></>
          ) : (
            <>
              <UserProfileStat
                name='Seguidos'
                value={`${userStats.numFolloweds ?? 0}`}
                box={false}
              />
              <UserProfileStat
                name='Seguidores'
                value={`${userStats.numFollowers ?? 0}`}
                box={false}
              />
            </>
          )
        }
      </div>
    </>
  )
}
