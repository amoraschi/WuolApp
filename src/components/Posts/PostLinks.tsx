import { GoFileSymlinkFile } from 'react-icons/go'

interface PostLinksProps {
  onClick: () => void
}

export default function PostLinks ({ onClick }: PostLinksProps) {
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
    <span
      className={className}
      onClick={onClick}
    >
      <GoFileSymlinkFile />
    </span>
  )
}
