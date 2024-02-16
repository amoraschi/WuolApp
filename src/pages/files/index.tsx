import Files from '@/components/Page/Files'
import Sidebar from '@/components/Sidebar/Sidebar'
import { User, UserBookmarks } from '@/types/User'
import { fetchBookmarked, handleSelfData } from '@/utils/data'
import { useEffect, useState } from 'react'

export default function FilesPage () {
  const [selfData, setSelfData] = useState<User | null>(null)
  const [bookmarkedFiles, setBookmarkedFiles] = useState<UserBookmarks | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getSelfData = async () => {
      await handleSelfData(setSelfData, abortController.signal)

      const storedBookmarkedFiles = localStorage.getItem('bookmarkedFiles')
      if (storedBookmarkedFiles != null) {
        const bookmarkedFiles = JSON.parse(storedBookmarkedFiles)
        setBookmarkedFiles(bookmarkedFiles)
        return
      }

      const bookmarkedFiles = await fetchBookmarked()
      if (bookmarkedFiles != null) {
        localStorage.setItem('bookmarkedFiles', JSON.stringify(bookmarkedFiles))
        setBookmarkedFiles(bookmarkedFiles)
      }
    }

    getSelfData()

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
        bookmarkedFiles == null ? (
          <></>
        ) : (
          <Files
            bookmarks={bookmarkedFiles}
            setBookmarkedFiles={setBookmarkedFiles}
          />
        )
      }
      <Sidebar
        user={selfData}
      />
    </main>
  )
}
