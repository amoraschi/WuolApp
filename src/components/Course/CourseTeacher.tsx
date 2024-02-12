import Image from 'next/image'
import { open } from '@tauri-apps/api/shell'
import { Item } from '@/types/Teachers'
import { roundToThousandsString } from '@/utils/math'

interface CourseTeacherProps {
  teacher: Item
}

export default function CourseTeacher ({ teacher }: CourseTeacherProps) {
  const onClick = () => {
    open(`https://wuolah.com/profile/${teacher.profile.nickname ?? ''}`)
  }

  return (
    <div
      className={`
        flex
        items-center
        cursor-pointer
        rounded-md
        w-fit
        p-2
        hover:bg-gray-100
        hover:shadow-md
        transition-all
        duration-300
      `}
      onClick={onClick}
    >
      <Image
        src={teacher.profile.avatarUrl ?? '/wuolapp_square.png'}
        alt='User avatar'
        width={8}
        height={8}
        className={`
          w-8
          h-8
          rounded-full
          object-cover
          border-2
          border-transparent
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
            ml-2
            text-sm
            text-black
            font-semibold
          `}
        >
          {teacher.profile.nickname}
        </span>
        <span
          className={`
            ml-2
            text-xs
            text-gray-500
          `}
        >
          {roundToThousandsString(teacher.profile.popularity)}
        </span>
      </div>
    </div>
  )
}
