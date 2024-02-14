import Image from 'next/image'
import { GoSignOut } from 'react-icons/go'
import { User } from '@/types/User'
import UserImage from '../User/UserImage'

interface SidebarProfileBoxProps {
  user: User
}

export default function SidebarProfileBox ({ user }: SidebarProfileBoxProps) {
  return (
    <div
      className={`
        flex
        items-center
        h-full
        p-2
        gap-2
      `}
    >
      <UserImage
        src={user.avatarUrl}
        fallbackSrc={user.fallbackAvatarUrl}
        alt={`Avatar de ${user.nickname}`}
        width={10}
        height={10}
      />
      <div
        className={`
          flex
          flex-col
          w-full
        `}
      >
        <span
          className={`
            text-black
            font-semibold
            w-fit
          `}
        >
          {user.nickname.length > 15 ? `${user.nickname.slice(0, 15)}...` : (user.nickname ?? 'Wuolero')}
        </span>
        <span
          className={`
            text-gray-500
            text-sm
            line-clamp-1
          `}
        >
          {user.defaultCommunity?.community?.name ?? 'Wuolah'}
        </span>
      </div>
      <span
        className={`
          cursor-pointer
          text-black
          text-xl
          hover:scale-110
          transition-all
          duration-200
        `}
      >
        <GoSignOut />
      </span>
    </div>
  )
}
