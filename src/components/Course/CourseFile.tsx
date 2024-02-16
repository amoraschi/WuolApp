import { SingleFile } from '@/types/Files'
import { dateString } from '@/utils/math'
import { GoTag } from 'react-icons/go'
import MediumText from '../Text/MediumText'
import SmallTextBox from '../Text/SmallTextBox'
import UserImage from '../User/UserImage'
import CourseFileStats from './CourseFileStats'
import FileIcon from '../Icons/FileIcon'
import { useRouter } from 'next/navigation'
import { fetchFileData, fetchFolderData } from '@/utils/data'

const fileIdRegex = /-(\d+)/

interface CourseFilesProps {
  file: SingleFile
}

export default function CourseFile ({ file }: CourseFilesProps) {
  const router = useRouter()

  const fileIdMatch = file.id != null ? file.id.match(fileIdRegex) : null
  const fileId = fileIdMatch != null ? fileIdMatch[1] : null

  // if (file.extension == null) {
  //   console.log(file)
  // }

  const onClick = () => {
    const getFileData = async () => {
      if (fileId == null) {
        return
      }

      if (file.extension != null) {
        // File
        const res = await fetchFileData(fileId)
        if (res == null) {
          return
        }

        localStorage.setItem('selected-file', JSON.stringify(res))
        router.replace('/files/file')
      } else {
        // Folder
        const res = await fetchFolderData(`${file.entityId}`)
        if (res == null) {
          return
        }

        localStorage.setItem('selected-folder', JSON.stringify(res))
        router.replace('/files/folder')
      }
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
            downloads={file.stats.numDownloads ?? 0}
            paid={file.stats.numPaidDownloads ?? 0}
            views={file.stats.numViews ?? 0}
            bookmarks={file.stats.numBookmarks ?? 0}
          />
        </div>
      </div>
    </div>
  )
}
