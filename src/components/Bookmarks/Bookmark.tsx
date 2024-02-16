import { UserBookmark } from '@/types/User'
import SmallTextBox from '../Text/SmallTextBox'
import { dateString } from '@/utils/math'

interface BookmarkProps {
  bookmark: UserBookmark
}

export default function Bookmark ({ bookmark }: BookmarkProps) {
  return (
    <div
      className={`
        flex
        flex-col
        cursor-pointer
        hover:bg-gray-100
        rounded-md
        gap-1
        p-2
        transition-all
        duration-200
      `}
    >
      <span
        className={`
          text-black
          text-lg
          font-semibold
        `}
      >
        {bookmark.document.name ?? 'Sin nombre'}
      </span>
      <div
        className={`
          flex
          gap-2
        `}
      >
        <SmallTextBox
          content={`Se guardó el ${dateString(new Date(bookmark.createdAt))}`}
        />
        <SmallTextBox
          content={bookmark.document.subject.name ?? 'Sin materia'}
        />
      </div>
    </div>
  )
}
