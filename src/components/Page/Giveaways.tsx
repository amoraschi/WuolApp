import { GiveawaysData } from '@/types/Giveaways'
import { User } from '@/types/User'
import { fetchGiveaways } from '@/utils/data'
import { useEffect, useState } from 'react'
import Giveaway from '../Giveaways/Giveaway'
import MediumText from '../Text/MediumText'

interface GiveawaysProps {
  selfData: User
}

export default function Giveaways ({ selfData }: GiveawaysProps) {
  const [giveaways, setGiveaways] = useState<GiveawaysData | null>(null)

  useEffect(() => {
    const storedGiveaways = localStorage.getItem('giveaways')
    if (storedGiveaways != null) {
      setGiveaways(JSON.parse(storedGiveaways))
      return
    }

    const abortController = new AbortController()
    const getGiveaways = async () => {
      const res = await fetchGiveaways(`${selfData.defaultCommunityId}`, abortController.signal)
      if (res == null) {
        return
      }

      setGiveaways(res)
      localStorage.setItem('giveaways', JSON.stringify(res))
    }

    getGiveaways()

    return () => {
      abortController.abort()
    }
  }, [selfData])

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
        content='SORTEOS'
      />
      <div
        className={`
          grid
          grid-cols-4
        `}
      >
        {
          giveaways == null ? (
            <></>
          ) : (
            giveaways.items.map((giveaway, index) => (
              <Giveaway
                giveaway={giveaway}
                key={index}
              />
            ))
          )
        }
      M</div>
    </div>
  )
}
