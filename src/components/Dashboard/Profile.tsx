import Image from 'next/image'
import { useEffect, useState } from 'react'
import { fetchSelfData, fetchUserStats } from '@/utils/data'
import { WuolahUser } from '@/types/WuolahUser'
import { UserStats, currencies } from '@/utils/constants'
import ProfileStat from './ProfileStat'
import { deltaDays, moneyString } from '@/utils/math'
import { GoEye, GoEyeClosed } from 'react-icons/go'
import { open } from '@tauri-apps/api/shell'

export default function Profile () {
  const [selfData, setSelfData] = useState<WuolahUser | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [showMoney, setShowMoney] = useState(false)

  const onClick = () => {
    open('https://wuolah.com/profile/balance/withdraw')
  }

  useEffect(() => {
    const abortController = new AbortController()
    const getSelfData = async () => {
      const storedSelfData = localStorage.getItem('selfData')
      const storedUserStats = localStorage.getItem('userStats')
      if (storedSelfData != null) {
        setSelfData(JSON.parse(storedSelfData))
      }

      if (storedUserStats != null) {
        setUserStats(JSON.parse(storedUserStats))
        return
      }

      const res = await fetchSelfData(abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem('selfData', JSON.stringify(res))
      setSelfData(res)

      const stats = await fetchUserStats(abortController.signal)
      if (stats == null) {
        return
      }

      localStorage.setItem('userStats', JSON.stringify(stats))
      setUserStats(stats)
    }

    getSelfData()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      {
        selfData == null ? (
          <></>
        ) : (
          <div>
            <span
              className={`
                text-md
                font-semibold
                text-gray-700
              `}
            >
              PERFIL
            </span>
            <div
              className={`
                flex
                flex-col
                items-center
                w-full
              `}
            >
              <Image
                src={selfData.avatarUrl}
                alt='Profile picture'
                width={100}
                height={100}
                className={`
                  h-24
                  w-24
                  object-cover
                  border-2
                  border-gray-300
                  rounded-full
                  shadow-md
                `}
              />
              <span
                className={`
                  text-lg
                  font-bold
                  text-black
                `}
              >
                {selfData.nickname}
              </span>
              <span
                className={`
                  text-sm
                  text-gray-500
                  bg-gray-200
                  rounded-sm
                  px-1
                `}
              >
                Te uniste hace {deltaDays(new Date(selfData.createdAt))} días
              </span>
              <div
                className={`
                  grid
                  grid-cols-3
                  gap-2
                  mt-4
                `}
              >
                <ProfileStat
                  data={userStats?.numFiles ?? 0}
                  text='Publicaciones'
                />
                <ProfileStat
                  data={userStats?.numPaidDownloads ?? 0}
                  text='Interacciones'
                />
                <ProfileStat
                  data={selfData.popularity ?? 0}
                  text='XP'
                />
              </div>
              <div
                className={`
                  flex
                  gap-1
                  mt-4
                `}
              >
                <span
                  className={`
                    text-sm
                    text-black
                    font-bold
                  `}
                >
                  {userStats?.numFolloweds ?? 0}
                </span>
                <span
                  className={`
                    text-sm
                    text-gray-500
                    mr-2
                  `}
                >
                  Seguidos
                </span>
                <span
                  className={`
                    text-sm
                    text-black
                    font-bold
                  `}
                >
                  {userStats?.numFollowers ?? 0}
                </span>
                <span
                  className={`
                    text-sm
                    text-gray-500
                  `}
                >
                  Seguidores
                </span>
              </div>
            </div>
            <div>
              <div
                className={`
                  flex
                  items-center
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
                  SALDO
                </span>
                <span>
                  {
                    showMoney ? (
                      <GoEyeClosed
                        onClick={() => setShowMoney(!showMoney)}
                        className={`
                          cursor-pointer
                          ml-2
                          text-gray-500
                          hover:text-black
                          hover:scale-110
                          transition-all
                          duration-200
                        `}
                      />
                    ) : (
                      <GoEye
                        onClick={() => setShowMoney(!showMoney)}
                        className={`
                          cursor-pointer
                          ml-2
                          text-gray-500
                          hover:text-black
                          hover:scale-110
                          transition-all
                          duration-200
                        `}
                      />
                    )
                  }
                </span>
              </div>
              <div
                className={`
                  flex
                  flex-col
                `}
              >
                <span
                  className={`
                    text-lg
                    font-bold
                    text-black
                  `}
                >
                  {
                    showMoney ? (
                      moneyString(selfData, selfData.money ?? 0)
                    ) : (
                      '*****'
                    )
                  }
                </span>
                <span
                  className={`
                    text-sm
                    text-gray-500
                  `}
                >
                  Saldo acumulado en tu cuenta: {
                    showMoney ? (
                      moneyString(selfData, selfData.accumulated ?? 0)
                    ) : (
                      '*****'
                    )
                  }
                </span>
                <button
                  className={`
                    mt-4
                    bg-blue-500
                    text-white
                    font-bold
                    w-fit
                    py-2
                    px-4
                    rounded-md
                    hover:bg-blue-600
                    transition-all
                    duration-200
                  `}
                  onClick={onClick}
                >
                  Recargar
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
