import { Profile } from '@/types/Teachers'
import { WuolahUser } from '@/types/User'
import { localeMoney, roundToThousandsString } from '@/utils/math'
import { open } from '@tauri-apps/api/shell'
import Image from 'next/image'
import { GoCheckCircleFill } from 'react-icons/go'

interface UserProps {
  user: WuolahUser | Profile
  xp: number
}

export default function User ({ user, xp }: UserProps) {
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
      <Image
        src={user.avatarUrl}
        alt='Avatar'
        width={100}
        height={100}
        className={`
          w-8
          h-8
          rounded-full
          object-cover
        `}
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
