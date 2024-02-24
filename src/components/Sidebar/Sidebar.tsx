import { useEffect, useState } from 'react'
import { GoBookmark, GoGift, GoHome, GoMortarBoard, GoPeople } from 'react-icons/go'
import { handleSelfData } from '@/utils/data'
import { User } from '@/types/User'
import SidebarProfileBox from '@/components/Sidebar/SidebarProfileBox'
import SidebarTab from '@/components/Sidebar/SidebarTab'

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
    icon: <GoBookmark />
  },
  {
    name: 'Profesores',
    href: '/teachers',
    icon: <GoPeople />
  },
  {
    name: 'Sorteos',
    href: '/giveaways',
    icon: <GoGift />
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
