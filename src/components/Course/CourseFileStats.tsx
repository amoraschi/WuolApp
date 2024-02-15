import { GoBookmark, GoCreditCard, GoDownload, GoEye, GoTag } from 'react-icons/go'
import { Stats } from '@/types/Files'

interface CourseFileStatsProps {
  stats: Stats
}

export default function CourseFileStats ({ stats }: CourseFileStatsProps) {
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
      {stats.numDownloads ?? 0}
      &nbsp;
      <GoCreditCard
        title='Número de descargas financiadas'
      />
      {stats.numPaidDownloads ?? 0}
      &nbsp;
      <GoEye
        title='Número de visualizaciones'
      />
      {stats.numViews ?? 0}
      &nbsp;
      <GoBookmark
        title='Número de guardados'
      />
      {stats.numBookmarks ?? 0}
    </div>
  )
}
