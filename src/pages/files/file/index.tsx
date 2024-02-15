import File from '@/components/Page/File'
import Sidebar from '@/components/Sidebar/Sidebar'
import { SingleFile } from '@/types/Files'
import { User } from '@/types/User'
import { handleSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'

export default function FilePage () {
  const [selfData, setSelfData] = useState<User | null>(null)
  const [file, setFile] = useState<SingleFile | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getSelfData = async () => {
      await handleSelfData(setSelfData, abortController.signal)
    }

    getSelfData()

    const storedFile = localStorage.getItem('selected-file')
    if (storedFile != null) {
      setFile(JSON.parse(storedFile))
    }

    return () => {
      abortController.abort()
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
      <Sidebar
        user={selfData}
      />
    </main>
  )
}
