import { GoHome, GoMortarBoard } from 'react-icons/go'
import { WuolahUser } from '@/types/User'
import { useEffect, useState } from 'react'
import ProfileBox from './ProfileBox'
import SidebarTab from './SidebarTab'

export interface SidebarProps {
  user: WuolahUser | null
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
            <ProfileBox
              user={user}
            />
          )
        }
      </div>
    </div>
  )
}
