import { File } from '@/types/Files'
import { dateString } from '@/utils/math'
import Image from 'next/image'
import { GoBookmark, GoCreditCard, GoDownload, GoEye, GoTag } from 'react-icons/go'
import MediumText from '../Text/MediumText'
import SmallTextBox from '../Text/SmallTextBox'
import UserImage from '../User/UserImage'

interface CourseFilesProps {
  file: File
}

export default function CourseFile ({ file }: CourseFilesProps) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-1
        p-2
        rounded-md
        cursor-pointer
        hover:shadow-md
        hover:bg-gray-100
        transition-all
        duration-200
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
            <div
              className={`
                flex
                items-center
                text-sm
                text-gray-500
                gap-1
              `}
            >
              <GoTag />
              {file.teacher}
            </div>
          )
        }
        <span
          className={`
            text-sm
            text-gray-500
            bg-gray-200
            rounded-sm
            px-1
          `}
        >
          {dateString(new Date(file.createdAt))}
        </span>
        <div
          className={`
            flex
            items-center
            gap-1
            text-sm
            text-gray-500
          `}
        >
          <GoDownload
            title='Número de descargas'
          />
          {file.stats.numDownloads ?? 0}
          &nbsp;
          <GoCreditCard
            title='Número de descargas financiadas'
          />
          {file.stats.numPaidDownloads ?? 0}
          &nbsp;
          <GoEye
            title='Número de visualizaciones'
          />
          {file.stats.numViews ?? 0}
          &nbsp;
          <GoBookmark
            title='Número de guardados'
          />
          {file.stats.numBookmarks ?? 0}
        </div>
      </div>
    </div>
  )
}
