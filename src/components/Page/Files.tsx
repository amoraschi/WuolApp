import { UserBookmarks } from '@/types/User'
import MediumText from '../Text/MediumText'

interface FilesProps {
  bookmarks: UserBookmarks
}

export default function Files ({ bookmarks }: FilesProps) {
  console.log(bookmarks)
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
        gap-1
      `}
    >
      <MediumText
        content='ARCHIVOS GUARDADOS'
      />
      {
        bookmarks.data.length === 0 ? (
          <div
            className={`
              w-full
              h-full
              flex
              items-center
              justify-center
            `}
          >
            <MediumText
              content='No tienes archivos guardados'
            />
          </div>
        ) : (
          bookmarks.data.map((file, index) => (
            <div
              key={index}
              className={`
                w-full
                h-12
                flex
                items-center
                justify-between
                px-4
                border
                border-gray-200
                rounded-md
                hover:bg-gray-100
              `}
            >
              <MediumText
                content={file.document.name}
              />
            </div>
          ))
        )
      }
    </div>
  )
}
