import { GoBookmark, GoCreditCard, GoDownload, GoEye, GoTag } from 'react-icons/go'
import { Stats } from '@/types/Files'

interface CourseFileStatsProps {
  downloads: number
  paid: number
  views: number
  bookmarks: number
}

export default function CourseFileStats ({ downloads, paid, views, bookmarks }: CourseFileStatsProps) {
  return (
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
      {downloads ?? 0}
      &nbsp;
      <GoCreditCard
        title='Número de descargas financiadas'
      />
      {paid ?? 0}
      &nbsp;
      <GoEye
        title='Número de visualizaciones'
      />
      {views ?? 0}
      &nbsp;
      <GoBookmark
        title='Número de guardados'
      />
      {bookmarks ?? 0}
    </div>
  )
}
