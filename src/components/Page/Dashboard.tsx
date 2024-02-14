import Image from 'next/image'
import { GoLink } from 'react-icons/go'
import { open } from '@tauri-apps/api/shell'
import { User } from '@/types/User'
import PostList from '../Posts/PostList'
import UserList from '../User/UserList'
import UserProfile from '../UserProfile/UserProfile'
import LinkIcon from '../Icons/LinkIcon'

interface DashboardProps {
  user: User
}

export default function Dashboard ({ user }: DashboardProps) {
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
                mt-4
                mx-8
              `}
            >
              <span
                className={`
                  text-2xl
                  text-black
                  font-bold
                `}
              >
                {user.defaultCommunity?.community?.segmentations?.study?.item?.name ?? 'No hay grado seleccionada'}
              </span>
              <LinkIcon
                onClick={onClick}
              />
            </div>
            <span
              className={`
                text-sm
                text-gray-500
                mx-8
              `}
            >
              {user.defaultCommunity?.community?.segmentations?.university?.item?.name ?? 'No hay universidad seleccionada'} - {user.defaultCommunity?.community?.segmentations?.center?.item?.name ?? 'No hay centro seleccionado'}
            </span>
            <div
              className={`
                grid
                grid-cols-1
                xl:grid-cols-3
                mx-8
                my-4
                gap-4
              `}
            >
              <UserProfile
                user={user}
              />
              <PostList />
              <UserList
                name='RANKING'
                type='RANKINGS'
                communityId={user.defaultCommunityId}
              />
            </div>
          </>
        )
      }
    </div>
  )
}
