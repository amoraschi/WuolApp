import { useState } from 'react'
import { GoBookmark, GoBookmarkFill, GoBookmarkSlashFill } from 'react-icons/go'

interface BookmarkIconProps {
  saveFile: boolean
  onClick: () => void
}

export default function BookmarkIcon ({ saveFile, onClick }: BookmarkIconProps) {
  const [mouseHover, setMouseHover] = useState(false)

  const className = `
    text-3xl
    text-blue-500
    cursor-pointer
  `

  return (
    <>
      {
        saveFile ? (
          mouseHover ? (
            <GoBookmarkSlashFill
              className={className}
              onClick={onClick}
              onMouseEnter={() => setMouseHover(true)}
              onMouseLeave={() => setMouseHover(false)}
            />
          ) : (
            <GoBookmarkFill
              className={className}
              onClick={onClick}
              onMouseEnter={() => setMouseHover(true)}
              onMouseLeave={() => setMouseHover(false)}
            />
          )
        ) : (
          mouseHover ? (
            <GoBookmarkFill
              className={className}
              onClick={onClick}
              onMouseEnter={() => setMouseHover(true)}
              onMouseLeave={() => setMouseHover(false)}
            />
          ) : (
            <GoBookmark
              className={className}
              onClick={onClick}
              onMouseEnter={() => setMouseHover(true)}
              onMouseLeave={() => setMouseHover(false)}
            />
          )
        )
      }
    </>
  )
}
