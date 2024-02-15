import { GoFile, GoFileDirectory } from 'react-icons/go'
import LargeText from '../Text/LargeText'

interface FileIconProps {
  extension: string | undefined
}

export default function FileIcon ({ extension }: FileIconProps) {
  return (
    <LargeText
      content={extension == null ? <GoFileDirectory /> : <GoFile />}
    />
  )
}
