import { GoEye, GoEyeClosed } from 'react-icons/go'

interface EyeIconProps {
  show: boolean
  setShow: (show: boolean) => void
}

export function EyeIcon ({ show, setShow }: EyeIconProps) {
  const className = `
    cursor-pointer
    ml-2
    text-gray-500
    hover:text-black
    hover:scale-110
    transition-all
    duration-200
  `

  return (
    show ? (
      <GoEyeClosed
        onClick={() => setShow(!show)}
        className={className}
      />
    ) : (
      <GoEye
        onClick={() => setShow(!show)}
        className={className}
      />
    )
  )
}
