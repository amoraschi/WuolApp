interface LargeTextProps {
  content: string | number | JSX.Element
}

export default function LargeText ({ content }: LargeTextProps) {
  return (
    <span
      className={`
        text-2xl
        text-black
        font-semibold
      `}
    >
      {content}
    </span>
  )
}
