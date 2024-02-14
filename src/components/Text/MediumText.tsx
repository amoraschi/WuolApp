interface MediumTextProps {
  value: string
}

export default function MediumText ({ value }: MediumTextProps) {
  return (
    <span
      className={`
        text-md
        font-semibold
        text-gray-700
      `}
    >
      {value}
    </span>
  )
}
