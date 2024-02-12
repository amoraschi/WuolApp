import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarTabProps {
  name: string
  href: string
  icon: JSX.Element
}

export default function SidebarTab ({ name, href, icon }: SidebarTabProps) {
  const pathname = usePathname()

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
        borderRight: pathname === href ? '4px solid #1d4ed8' : 'none'
      }}
      href={href}
    >
      <span
        className={`
          text-2xl
        `}
        style={{
          color: pathname === href ? '#1d4ed8' : '#aaaaaa'
        }}
      >
        {icon}
      </span>
      <span
        className={`
          text-black
          w-fit
        `}
        style={{
          color: pathname === href ? '#1d4ed8' : '#aaaaaa'
        }}
      >
        {name}
      </span>
    </Link>
  )
}
