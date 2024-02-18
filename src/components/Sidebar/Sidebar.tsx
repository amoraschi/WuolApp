import { GoBookmark, GoHome, GoMortarBoard, GoPeople } from 'react-icons/go'
import SidebarProfileBox from './SidebarProfileBox'
import SidebarTab from './SidebarTab'
import { User } from '@/types/User'
import { useEffect, useState } from 'react'
import { handleSelfData } from '@/utils/data'

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
    name: 'Guardados',
    href: '/bookmarks',
    icon: <GoBookmark />
  },
  {
    name: 'Profesores',
    href: '/teachers',
    icon: <GoPeople />
  }
]

export default function Sidebar () {
  const [selfData, setSelfData] = useState<User | null>(null)
  
  useEffect(() => {
    if (selfData != null) {
      return
    }

    const abortController = new AbortController()
    const fetchSelfData = async () => {
      await handleSelfData(setSelfData, abortController.signal)
    }

    fetchSelfData()

    return () => {
      abortController.abort()
    }
  }, [])

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
          h-fit
          w-fit
          mt-auto
          m-2
        `}
      >
        {
          selfData == null ? (
            <></>
          ) : (
            <SidebarProfileBox
              user={selfData}
            />
          )
        }
      </div>
    </div>
  )
}
