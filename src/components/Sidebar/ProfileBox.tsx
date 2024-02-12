import Image from 'next/image'
import { GoSignOut } from 'react-icons/go'
import { WuolahUser } from '@/types/WuolahUser'

interface ProfileBoxProps {
  user: WuolahUser
}

export default function ProfileBox ({ user }: ProfileBoxProps) {
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
      <Image
        src={user.avatarUrl ?? user.fallbackAvatarUrl}
        alt='User avatar'
        width={32}
        height={32}
        className={`
          rounded-full
          border-2
          border-blue-700
          w-10
          h-10
          object-cover
        `}
      />
      <div
        className={`
          flex
          flex-col
          gap-1
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
