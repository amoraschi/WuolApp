interface SmallTextBoxProps {
  content: string
}

export default function SmallTextBox ({ content }: SmallTextBoxProps) {
  return (
    <span
      className={`
        text-sm
        text-gray-500
        bg-gray-200
        rounded-sm
        px-1
      `}
    >
      {content}
    </span>
  )
}
