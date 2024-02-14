interface UserProfileBankValueProps {
  value: string
  text: string
  main: boolean
  show: boolean
}

export default function UserProfileBankValue ({ value, text, main, show }: UserProfileBankValueProps) {
  return (
    <span
      style={{
        fontSize: main ? '1.25rem' : '0.875rem',
        fontWeight: main ? 'bold' : 'normal',
        color: main ? 'black' : '#6B7280'
      }}
    >
      {text} {
        show ? (
          value
        ) : (
          '*****'
        )
      }
    </span>
  )
}
