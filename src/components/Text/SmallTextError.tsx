interface SmallTextErrorProps {
  content: string
}

export default function SmallTextError ({ content }: SmallTextErrorProps) {
  return (
    <span
      className={`
        text-red-500
        text-lg
        font-semibold
      `}
    >
      {content}
    </span>
  )
}
