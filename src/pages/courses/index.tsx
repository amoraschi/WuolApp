import { handleSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import { User } from '@/types/User'
import Courses from '@/components/Page/Courses'

export default function CoursesPage () {
  return (
    <main
      className={`
        absolute
        inset-0
        bg-white
      `}
    >
      <Courses />
      <Sidebar />
    </main>
  )
}
