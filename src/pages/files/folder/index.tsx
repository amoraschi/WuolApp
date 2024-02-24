import { useEffect, useState } from 'react'
import { FolderData } from '@/types/Files'
import Folder from '@/components/Page/Folder'
import Sidebar from '@/components/Sidebar/Sidebar'

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
