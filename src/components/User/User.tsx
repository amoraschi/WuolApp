import { User } from '@/types/User'
import { localeMoney, roundToThousandsString } from '@/utils/math'
import { open } from '@tauri-apps/api/shell'
import Image from 'next/image'
import { GoCheckCircleFill } from 'react-icons/go'
import UserImage from './UserImage'

interface UserProps {
  user: User
  xp: number
  rank?: number
}

export default function User ({ user, xp, rank }: UserProps) {
  const onClick = () => {
    open(`https://wuolah.com/profile/${user.nickname}`)
  }

  return (
    <div
      className={`
        flex
        items-center
        cursor-pointer
        rounded-md
        p-2
        gap-2
        hover:bg-gray-100
        hover:shadow-md
        transition-all
        duration-300
      `}
      onClick={onClick}
    >
      <UserImage
        src={user.avatarUrl}
        fallbackSrc={user.fallbackAvatarUrl}
        alt='Avatar'
        width={8}
        height={8}
        color={rank != null ? (rank === 1 ? '#FCD34D' : rank === 2 ? '#9CA3AF' : rank === 3 ? '#B07E6C' : undefined) : undefined}
      />
      <div
        className={`
          flex
          flex-col
        `}
      >
        <span
          className={`
            flex
            items-center
            gap-2
            text-sm
            text-black
            font-semibold
          `}
        >
          {user.nickname}
          {
            user.partnerType > 5 && (
              <GoCheckCircleFill
                className={`
                  text-green-500
                  ml-1
                `}
                title='Asociado'
              />
            )
          }
        </span>
        <span
          className={`
            text-xs
            text-gray-500
          `}
        >
          {roundToThousandsString(xp)} - {localeMoney(user.totalMoney ?? 0)}
        </span>
      </div>
    </div>
  )
}
