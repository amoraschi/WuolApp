interface SmallTextBoxProps {
  content: string
  noBackground?: boolean
}

export default function SmallTextBox ({ content, noBackground }: SmallTextBoxProps) {
  return (
    <span
      className={`
        text-sm
        text-gray-500
        rounded-sm
      `}
      style={{
        backgroundColor: noBackground ? undefined : '#E5E7EB',
        paddingLeft: noBackground ? undefined : '0.25rem',
        paddingRight: noBackground ? undefined : '0.25rem'
      }}
    >
      {content}
    </span>
  )
}
