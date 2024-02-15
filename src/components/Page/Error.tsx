import Link from 'next/link'
import LargeText from '../Text/LargeText'
import MediumText from '../Text/MediumText'

export default function Error () {
  return (
    <div
      className={`
        flex
        flex-col
        gap-4
        items-center
      `}
    >
      <LargeText
        content={'Error 404'}
      />
      <MediumText
        content={'Página no encontrada'}
      />
      <Link
        href={'/dashboard'}
        className={`
          text-blue-500
          hover:underline
        `}
      >
        Volver al inicio
      </Link>
    </div>
  )
}
