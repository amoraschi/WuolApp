import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarTabProps {
  name: string
  href: string
  icon: JSX.Element
}

export default function SidebarTab ({ name, href, icon }: SidebarTabProps) {
  const pathname = usePathname()

  const onClick = () => {
    localStorage.removeItem('selected-course')
  }

  return (
    <Link
      className={`
        flex
        items-center
        w-full
        p-2
        gap-2
        cursor-pointer
        rounded-md
        hover:shadow-md
        transition-all
        duration-300
      `}
      style={{
        borderRight: pathname.includes(href) ? '4px solid #1d4ed8' : 'none'
      }}
      href={href}
      onClick={onClick}
    >
      <span
        className={`
          text-2xl
        `}
        style={{
          color: pathname.includes(href) ? '#1d4ed8' : '#aaaaaa'
        }}
      >
        {icon}
      </span>
      <span
        className={`
          w-fit
        `}
        style={{
          color: pathname.includes(href) ? '#1d4ed8' : '#aaaaaa'
        }}
      >
        {name}
      </span>
    </Link>
  )
}
