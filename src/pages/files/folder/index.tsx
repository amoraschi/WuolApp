import Files from '@/components/Page/Files'
import Folder from '@/components/Page/Folder'
import Sidebar from '@/components/Sidebar/Sidebar'
import { FolderData } from '@/types/Files'
import { User } from '@/types/User'
import { handleSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'

export default function FolderPage () {
  const [folder, setFolder] = useState<FolderData | null>(null)

  useEffect(() => {
    const selectedFolder = localStorage.getItem('selected-folder')
    if (selectedFolder != null) {
      setFolder(JSON.parse(selectedFolder))
    }
  }, [])

  return (
    <main
      className={`
        absolute
        inset-0
        bg-white
      `}
    >
      {
        folder == null ? (
          <></>
        ) : (
          <Folder
            folder={folder}
          />
        )
      }
      <Sidebar />
    </main>
  )
}
