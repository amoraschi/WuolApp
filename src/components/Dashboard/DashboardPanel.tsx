import Image from 'next/image'
import { GoLink } from 'react-icons/go'
import { open } from '@tauri-apps/api/shell'
import { WuolahUser } from '@/types/WuolahUser'
import Leaderboard from './Leaderboard'
import NewPostList from './NewPostList'
import Profile from './Profile'

interface DashboardPanelProps {
  user: WuolahUser | null
}

export default function DashboardPanel ({ user }: DashboardPanelProps) {
  const onClick = () => {
    open(`https://wuolah.com/${user?.defaultCommunity?.community?.slug ?? ''}`)
  }

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
      `}
    >
      {
        user == null ? (
          <></>
        ) : (
          <>
            <div
              className={`
                h-1/3
              `}
            >
              <Image
                src={user.defaultCommunity?.community?.segmentations?.center?.item?.backgroundUrl ?? '/wuolapp_square.png'}
                alt='Community background'
                width={100}
                height={100}
                className={`
                  h-full
                  w-full
                  object-cover
                `}
              />
            </div>
            <div
              className={`
                flex
                justify-between
                items-center
                pt-4
                px-8
              `}
            >
              <span
                className={`
                  text-2xl
                  text-black
                  font-bold
                  line-clamp-1
                `}
              >
                {user.defaultCommunity?.community?.segmentations?.study?.item?.name ?? 'No hay grado seleccionada'}
              </span>
              <span
                className={`
                  text-sm
                  text-gray-500
                  cursor-pointer
                  hover:text-black
                  hover:scale-110
                  transition-all
                  duration-200
                `}
                onClick={onClick}
              >
                <GoLink />
              </span>
            </div>
            <span
              className={`
                text-sm
                text-gray-500
                px-8
                pb-4
                line-clamp-1
              `}
            >
              {user.defaultCommunity?.community?.segmentations?.university?.item?.name ?? 'No hay universidad seleccionada'} - {user.defaultCommunity?.community?.segmentations?.center?.item?.name ?? 'No hay centro seleccionado'}
            </span>
            <div
              className={`
                grid
                grid-cols-3
                mx-8
                gap-4
              `}
            >
              <Leaderboard />
              <NewPostList />
              <Profile />
            </div>
          </>
        )
      }
    </div>
  )
}
