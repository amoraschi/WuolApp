import { GoFile, GoHome, GoMortarBoard } from 'react-icons/go'
import SidebarProfileBox from './SidebarProfileBox'
import SidebarTab from './SidebarTab'
import { User } from '@/types/User'

export interface SidebarProps {
  user: User | null
}

const tabs = [
  {
    name: 'Inicio',
    href: '/dashboard',
    icon: <GoHome />
  },
  {
    name: 'Asignaturas',
    href: '/courses',
    icon: <GoMortarBoard />
  },
  {
    name: 'Archivos',
    href: '/files',
    icon: <GoFile />
  }
]

export default function Sidebar ({ user }: SidebarProps) {
  return (
    <div
      className={`
        absolute
        inset-0
        border-r-2
        shadow-md
        w-64
        h-full
        flex
        flex-col
      `}
    >
      <div
        className={`
          flex
          flex-col
          gap-4
          p-4
        `}
      >
        {
          tabs.map((tab, index) => (
            <SidebarTab
              key={index}
              name={tab.name}
              href={tab.href}
              icon={tab.icon}
            />
          ))
        }
      </div>
      <div
        className={`
          h-16
          w-fit
          mt-auto
          m-2
          rounded-md
          shadow-md
          bg-white
        `}
      >
        {
          user == null ? (
            <></>
          ) : (
            <SidebarProfileBox
              user={user}
            />
          )
        }
      </div>
    </div>
  )
}
