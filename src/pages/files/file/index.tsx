import { useEffect, useState } from 'react'
import { FileData } from '@/types/Files'
import File from '@/components/Page/File'
import Sidebar from '@/components/Sidebar/Sidebar'

export default function FilePage () {
  const [file, setFile] = useState<FileData | null>(null)

  useEffect(() => {
    const storedFile = localStorage.getItem('selected-file')
    if (storedFile != null) {
      setFile(JSON.parse(storedFile))
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
        file == null ? (
          <></>
        ) : (
          <File
            file={file}
          />
        )
      }
      <Sidebar />
    </main>
  )
}
