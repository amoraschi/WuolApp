import { AiOutlineLoading } from 'react-icons/ai';
import { GoDownload, GoFileSymlinkFile } from 'react-icons/go';

interface PostLinksProps {
  downloadingNow: boolean
  onClick: () => void
  downloadFile: () => void
}

export default function PostLinks ({ downloadingNow, onClick, downloadFile }: PostLinksProps) {
  const className = `
    text-xl
    text-gray-500
    cursor-pointer
    hover:text-black
    hover:scale-110
    transition-all
    duration-150
  `

  return (
    <>
      <span
        className={className}
        onClick={onClick}
      >
        <GoFileSymlinkFile />
      </span>
      <span
        className={className}
        onClick={downloadFile}
      >
        {
          downloadingNow ? (
            <AiOutlineLoading
              className={`
                animate-spin
              `}
            />
          ) : (
            <GoDownload />
          )
        }
      </span>
    </>
  )
}
