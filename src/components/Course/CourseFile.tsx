import { Item } from '@/types/Files'
import { dateString } from '@/utils/math'
import Image from 'next/image'
import { GoBookmark, GoCreditCard, GoDownload, GoEye, GoTag } from 'react-icons/go'

interface CourseFilesProps {
  file: Item
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
      <div>
        <span
          className={`
            text-md
            font-semibold
            text-gray-500
            bg-gray-200
            rounded-sm
            px-1
          `}
        >
          {file.entitySubtype.toUpperCase()}
        </span>
        <span
          className={`
            text-md
            font-semibold
            text-black
            ml-2
          `}
        >
          {file.title}
        </span>
      </div>
      <div
        className={`
          flex
          items-center
          gap-2
        `}
      >
        <Image
          src={file.profile?.avatarUrl ?? '/wuolapp_square.png'}
          alt={file.profile?.nickname ?? 'Anónimo'}
          width={24}
          height={24}
          className={`
            rounded-full
            w-6
            h-6
            object-cover
          `}
        />
        <span
          className={`
            text-sm
            text-gray-500
          `}
        >
          {file.profile?.nickname ?? 'Anónimo'}
        </span>
        {
          file.teacher != '' && (
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
