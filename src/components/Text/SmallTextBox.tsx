interface SmallTextBoxProps {
  content: string | number | JSX.Element
  color?: string
  backgroundColor?: string
  noBackground?: boolean
  onClick?: () => void
}

export default function SmallTextBox ({ content, color, backgroundColor, noBackground, onClick }: SmallTextBoxProps) {
  return (
    <span
      className={`
        hidden
        md:block
        text-sm
        text-gray-500
        rounded-sm
        w-fit
      `}
      style={{
        backgroundColor: noBackground ? undefined : (backgroundColor != null ? backgroundColor : '#E5E7EB'),
        paddingLeft: noBackground != null ? undefined : '0.25rem',
        paddingRight: noBackground != null ? undefined : '0.25rem',
        color: color != null ? color : '#6B7280',
      }}
      onClick={onClick}
    >
      {content}
    </span>
  )
}
