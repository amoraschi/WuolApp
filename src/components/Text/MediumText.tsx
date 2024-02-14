interface MediumTextProps {
  value: string
  black?: boolean
  clamp?: number
}

export default function MediumText ({ value, black, clamp }: MediumTextProps) {
  return (
    <span
      className={`
        text-md
        font-semibold
      `}
      style={{
        color: black ? 'black' : '#374151',
        overflow: clamp ? 'hidden' : undefined,
        display: clamp ? '-webkit-box' : undefined,
        WebkitLineClamp: clamp,
        WebkitBoxOrient: clamp ? 'vertical' : undefined
      }}
    >
      {value}
    </span>
  )
}
