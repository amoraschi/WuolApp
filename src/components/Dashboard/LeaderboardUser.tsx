import Image from 'next/image'
import { open } from '@tauri-apps/api/shell'
import { Item } from '@/types/Leaderboard'
import { roundMoney, roundToThousands } from '@/utils/math'

interface LeaderboardUserProps {
  user: Item
  currency: string
}

export default function LeaderboardUser ({ user, currency }: LeaderboardUserProps) {
  const onClick = () => {
    open(`https://wuolah.com/profile/${user.user?.nickname ?? ''}`)
  }

  return (
    <div
      className={`
        flex
        items-center
        cursor-pointer
        rounded-md
        p-2
        hover:bg-gray-100
        hover:shadow-md
        transition-all
        duration-300
      `}
      onClick={onClick}
    >
      <Image
        src={user.user?.avatarUrl ?? '/wuolapp_square.png'}
        alt='User avatar'
        width={8}
        height={8}
        className={`
          w-8
          h-8
          rounded-full
          object-cover
        `}
        style={{
          border: user.rank === 1 ? '2px solid #FFD700' : user.rank === 2 ? '2px solid #C0C0C0' : user.rank === 3 ? '2px solid #CD7F32' : '2px solid transparent' 
        }}
      />
      <div
        className={`
          flex
          flex-col
        `}
      >
        <span
          className={`
            ml-2
            text-sm
            text-black
            font-semibold
          `}
        >
          {user.user?.nickname}
        </span>
        <span
          className={`
            ml-2
            text-xs
            text-gray-500
          `}
        >
          {roundToThousands(user.value)}K{user.user?.displayMoney ? ` - ${roundMoney(user.user?.totalMoney ?? 0)}${currency}` : ''}
        </span>
      </div>
    </div>
  )
}
