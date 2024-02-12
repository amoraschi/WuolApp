import { Leaderboard } from '@/types/Leaderboard'
import { fetchCourseLeaderboard } from '@/utils/data'
import { useEffect, useState } from 'react'
import CourseLeaderboardUser from './CourseLeaderboardUser'
import { AiOutlineLoading } from 'react-icons/ai'

interface CourseLeaderboardProps {
  subjectId: number
}

export default function CourseLeaderboard ({ subjectId }: CourseLeaderboardProps) {
  const [courseLeaderboard, setCourseLeaderboard] = useState<Leaderboard | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getCourseLeaderboard = async () => {
      console.log(subjectId)
      const storedCourseLeaderboard = localStorage.getItem(`leaderboard-${subjectId}`)
      if (storedCourseLeaderboard != null) {
        console.log(JSON.parse(storedCourseLeaderboard))
        setCourseLeaderboard(JSON.parse(storedCourseLeaderboard))
        return
      }

      const res = await fetchCourseLeaderboard(`${subjectId}`, '5', abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem(`leaderboard-${subjectId}`, JSON.stringify(res))
      setCourseLeaderboard(res)
    }

    getCourseLeaderboard()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div
      className={`
        mt-4
      `}
    >
      <span
        className={`
          text-md
          font-semibold
          text-gray-700
        `}
      >
        RANKING
      </span>
      {
        courseLeaderboard == null ? (
          <div
            className={`
              m-2
            `}
          >
            <AiOutlineLoading
              className={`
                animate-spin
                text-4xl
                text-blue-700
              `}
            />
          </div>
        ) : (
          courseLeaderboard.items.map((user, index) => (
            <CourseLeaderboardUser
              key={index}
              user={user}
            />
          ))
        )
      }
    </div>
  )
}
