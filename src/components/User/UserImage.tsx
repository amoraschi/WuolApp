import Image from 'next/image'
import { useState } from 'react'

interface UserImageProps {
  src: string
  fallbackSrc: string
  alt: string
  width: number
  height: number
}

export default function UserImage ({ src, fallbackSrc, alt, width, height }: UserImageProps) {
  const [imgError, setImgError] = useState(false)
  
  return (
    <Image
      src={imgError ? fallbackSrc : src}
      alt={alt}
      width={100}
      height={100}
      onError={() => setImgError(true)}
      style={{
        height: `${height / 4}rem`,
        width: `${width / 4}rem`
      }}
      className={`
        rounded-full
        object-cover
      `}
    />
  )
}
