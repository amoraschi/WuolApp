import { AiOutlineLoading } from 'react-icons/ai'

interface LoadingIconProps {
  margin?: string
}

export default function LoadingIcon ({ margin }: LoadingIconProps) {
  return (
    <AiOutlineLoading
      className={`
        animate-spin
        text-gray-500
        text-2xl
        m-2
      `}
      style={{
        margin: margin != null ? `${margin}rem` : undefined
      }}
    />
  )
}
