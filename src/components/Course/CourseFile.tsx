import { File } from '@/types/Files'
import { dateString } from '@/utils/math'
import { GoTag } from 'react-icons/go'
import MediumText from '../Text/MediumText'
import SmallTextBox from '../Text/SmallTextBox'
import UserImage from '../User/UserImage'
import CourseFileStats from './CourseFileStats'
import FileIcon from '../Icons/FileIcon'
import { fetchFolderData } from '@/utils/data'

interface CourseFilesProps {
  file: File
}

export default function CourseFile ({ file }: CourseFilesProps) {
  const onClick = () => {
    console.log(file)

    const getFileData = async () => {
      if (file.extension != null) {
        return
      }

      const res = await fetchFolderData(`${file.entityId}`)
      if (res == null) {
        return
      }

      console.log(res)
    }

    getFileData()
  }

  return (
    <div
      className={`
        flex
        flex-row
        gap-2
        p-2
        rounded-md
        cursor-pointer
        hover:shadow-md
        hover:bg-gray-100
        transition-all
        duration-200
      `}
      onClick={onClick}
    >
      <FileIcon
        extension={file.extension}
      />
      <div
        className={`
          flex
          flex-col
          gap-1
        `}
      >
        <div
          className={`
            flex
            items-center
            gap-2
          `}
        >
          <SmallTextBox
            content={file.entitySubtype.toUpperCase()}
          />
          <MediumText
            content={file.title ?? 'Sin título'}
            black
          />
        </div>
        <div
          className={`
            flex
            items-center
            gap-2
          `}
        >
          <UserImage
            src={file.profile?.avatarUrl ?? '/wuolapp_square.png'}
            fallbackSrc={file.profile?.fallbackAvatarUrl ?? '/wuolapp_square.png'}
            alt={file.profile?.nickname ?? 'Anónimo'}
            width={6}
            height={6}
          />
          <SmallTextBox
            content={file.profile?.nickname ?? 'Anónimo'}
            noBackground
          />
          {
            file.teacher != null && file.teacher !== '' && (
              <>
                <SmallTextBox
                  content={<GoTag />}
                  noBackground
                />
                <SmallTextBox
                  content={file.teacher}
                  noBackground
                />
              </>
            )
          }
          <SmallTextBox
            content={dateString(new Date(file.createdAt))}
          />
          <CourseFileStats
            stats={file.stats}
          />
        </div>
      </div>
    </div>
  )
}
