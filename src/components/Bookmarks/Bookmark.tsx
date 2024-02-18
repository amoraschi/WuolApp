import { UserBookmark, UserBookmarks } from '@/types/User'
import SmallTextBox from '../Text/SmallTextBox'
import { dateString } from '@/utils/math'
import { bookmarkFile, fetchBookmarked, fetchFileData } from '@/utils/data'
import { useRouter } from 'next/navigation'
import BookmarkIcon from '../Icons/BookmarkIcon'

interface BookmarkProps {
  bookmark: UserBookmark
  setBookmarkedFiles: (bookmarks: UserBookmarks) => void
}

export default function Bookmark ({ bookmark, setBookmarkedFiles }: BookmarkProps) {
  const router = useRouter()

  const onClick = () => {
    const getFileData = async () => {
      if (bookmark?.documentId == null) {
        return
      }

      const res = await fetchFileData(`${bookmark.documentId}`)
      if (res == null) {
        return
      }

      localStorage.setItem('selected-file', JSON.stringify(res))
      router.replace('/bookmarks/file')
    }

    getFileData()
  }

  const unBookmark = () => {
    if (bookmark?.documentId == null) {
      return
    }

    const fetchBookmark = async () => {
      const res = await bookmarkFile(`${bookmark.documentId}`, false)
      if (res == null) {
        return
      }

      const bookmarkedFiles = await fetchBookmarked()
      if (bookmarkedFiles == null) {
        return
      }

      localStorage.setItem('bookmarkedFiles', JSON.stringify(bookmarkedFiles))
      setBookmarkedFiles(bookmarkedFiles)
    }

    fetchBookmark()
  }

  return (
    <div
      className={`
        flex
        items-center
        justify-between
        hover:bg-gray-100
        rounded-md
        gap-1
        p-2
        transition-all
        duration-200
      `}
    >
      <div
        className={`
          flex
          flex-col
          gap-1
        `}
      >
        <span
          className={`
            text-black
            text-lg
            font-semibold
            cursor-pointer
            hover:underline
          `}
          onClick={onClick}
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
      <BookmarkIcon
        onClick={unBookmark}
        saveFile={true}
      />
    </div>
  )
}
