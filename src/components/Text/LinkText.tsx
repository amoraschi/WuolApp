import Link from 'next/link'

interface LinkTextProps {
  href: string
  content: string
}

export default function LinkText ({ href, content }: LinkTextProps) {
  return (
    <Link
      href={href}
      className={`
        w-fit
        text-blue-500
        hover:underline
      `}
    >
      {content}
    </Link>
  )
}