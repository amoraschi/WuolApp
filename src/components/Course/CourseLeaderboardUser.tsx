import Image from 'next/image'
import { open } from '@tauri-apps/api/shell'
import { Item } from '@/types/Leaderboard'
import { roundToThousandsString } from '@/utils/math'
import { GoCheckCircleFill } from 'react-icons/go'

interface CourseLeaderboardUserProps {
  user: Item
}

export default function CourseLeaderboardUser ({ user }: CourseLeaderboardUserProps) {
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
        <div
          className={`
            flex
            items-center
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
          {
            user.user.partnerType > 5 && (
              <GoCheckCircleFill
                className={`
                  text-green-500
                  ml-1
                `}
                title='Asociado'
              />
            )
          }
        </div>
        <span
          className={`
            ml-2
            text-xs
            text-gray-500
          `}
        >
          {roundToThousandsString(user.value)}
        </span>
      </div>
    </div>
  )
}
