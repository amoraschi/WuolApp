import { dateString } from '@/utils/math'
import { FolderData } from '@/types/Files'
import LargeText from '@/components/Text/LargeText'
import FolderFile from '@/components/Folder/FolderFile'
import LinkText from '@/components/Text/LinkText'
import SmallTextBox from '@/components/Text/SmallTextBox'

interface FolderProps {
  folder: FolderData
}

export default function Folder ({ folder }: FolderProps) {
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
        px-8
        py-4
        gap-2
      `}
    >
      <LinkText
        content='Volver'
        href='/courses/course'
      />
      <div
        className={`
          flex
          flex-col
          gap-1
        `}
      >
        <LargeText
          content={`Carpeta${folder.data[0]?.user?.nickname != null ? ` de ${folder.data[0]?.user?.nickname}` : ''}`}
        />
        <SmallTextBox
          content={`Creada el ${dateString(new Date(folder.data[0]?.createdAt))}`}
        />
      </div>
      <div
        className={`
          grid
          place-items-center
          w-full
          h-full
        `}
      >
        <div
          className={`
            grid
            grid-cols-5
            gap-4
          `}
        >
          {
            folder.data.map((file, index) => (
              <FolderFile
                key={index}
                file={file}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
