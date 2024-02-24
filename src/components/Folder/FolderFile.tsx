import { FileData } from '@/types/Files'
import Image from 'next/image'
import SmallTextBox from '../Text/SmallTextBox'
import { useRouter } from 'next/navigation'

interface FolderFilesProps {
  file: FileData
}

export default function FolderFile ({ file }: FolderFilesProps) {
  const router = useRouter()

  const onClick = () => {
    localStorage.setItem('selected-file', JSON.stringify(file))
    router.replace('/files/file')
  }

  return (
    <div
      className={`
        flex
        flex-col
        items-center
        p-2
        gap-2
        border-b-2
        border-gray-200
        rounded-md
        cursor-pointer
        hover:bg-gray-100
        hover:shadow-md
        transition-all
        duration-200
      `}
      onClick={onClick}
    >
      {
        file.extension !== 'pdf' ? (
          <Image
            src='/wuolapp_square.png'
            alt='file-thumbnail'
            width={50}
            height={50}
            className={`
              rounded-md
              w-32
              border
              border-black
            `}
          />
        ) : (
          <Image
            src={`https://cdn.wuolahservices.com/api/thumbnail/document/${file.id}/thumbnail.png`}
            alt='file-thumbnail'
            width={50}
            height={50}
            className={`
              rounded-md
              w-32
              border
              border-black
            `}
          />
        )
      }
      <SmallTextBox
        content={file.name}
      />
    </div>
  )
}
