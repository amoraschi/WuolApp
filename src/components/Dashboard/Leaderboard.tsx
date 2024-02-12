import { useEffect, useState } from 'react'
import { fetchLeaderboard } from '@/utils/data'
import { Leaderboard } from '@/types/Leaderboard'
import LeaderboardUser from './LeaderboardUser'
import { currencies } from '@/utils/constants'

export default function Leaderboard () {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null)
  const [currency, setCurrency] = useState<string>('€')

  useEffect(() => {
    const abortController = new AbortController()
    const getLeaderboard = async () => {
      const storedLeaderboard = localStorage.getItem('leaderboard')
      if (storedLeaderboard != null) {
        console.log(JSON.parse(storedLeaderboard))
        setLeaderboard(JSON.parse(storedLeaderboard))
        return
      }

      const res = await fetchLeaderboard('10', abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem('leaderboard', JSON.stringify(res))
      setLeaderboard(res)
    }

    getLeaderboard()

    const selfData = localStorage.getItem('selfData')
    if (selfData != null) {
      const data = JSON.parse(selfData)
      const code: string = data.defaultCommunity?.community?.segmentations?.countryCode?.id ?? 'ES'

      setCurrency(currencies.find(currency => currency.country === code)?.symbol ?? '€')
    }

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      {
        leaderboard == null ? (
          <></>
        ) : (
          <div
            className={`
              w-fit
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
            <div
              className={`
                flex
                flex-col
                pt-2
              `}
            >
              {
                leaderboard.items.map((user, index) => (
                  <LeaderboardUser
                    key={index}
                    user={user}
                    currency={currency}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}
