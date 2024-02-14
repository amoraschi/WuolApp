import { GoLink } from 'react-icons/go'

interface LinkIconProps {
  onClick?: () => void
}

export default function LinkIcon ({ onClick }: LinkIconProps) {
  return (
    <span
      className={`
        text-sm
        text-gray-500
        cursor-pointer
        hover:text-black
        hover:scale-110
        transition-all
        duration-200
      `}
      onClick={onClick}
    >
      <GoLink />
    </span>
  )
}
