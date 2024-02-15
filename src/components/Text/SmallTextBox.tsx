interface SmallTextBoxProps {
  content: string | number | JSX.Element
  noBackground?: boolean
}

export default function SmallTextBox ({ content, noBackground }: SmallTextBoxProps) {
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
        backgroundColor: noBackground ? undefined : '#E5E7EB',
        paddingLeft: noBackground ? undefined : '0.25rem',
        paddingRight: noBackground ? undefined : '0.25rem'
      }}
    >
      {content}
    </span>
  )
}
