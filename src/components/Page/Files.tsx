import { UserBookmarks } from '@/types/User'
import MediumText from '../Text/MediumText'
import Bookmark from '../Bookmarks/Bookmark'

interface FilesProps {
  bookmarks: UserBookmarks
  setBookmarkedFiles: (bookmarks: UserBookmarks) => void
}

export default function Files ({ bookmarks, setBookmarkedFiles }: FilesProps) {
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
        p-8
      `}
    >
      <MediumText
        content='ARCHIVOS GUARDADOS'
      />
      {
        bookmarks.data.length === 0 ? (
          <div
            className={`
              grid
              place-items-center
              h-full
            `}
          >
            <MediumText
              content='No tienes archivos guardados'
            />
          </div>
        ) : (
          bookmarks.data.map((file, index) => (
            <Bookmark
              key={index}
              bookmark={file}
              setBookmarkedFiles={setBookmarkedFiles}
            />
          ))
        )
      }
    </div>
  )
}
