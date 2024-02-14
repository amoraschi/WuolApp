interface UserProfileStatProps {
  name: string
  value: string
  box: boolean
}

export default function UserProfileStat ({ name, value, box }: UserProfileStatProps) {
  return (
    <div
      className={`
        flex
        bg-gray-100
        rounded-md
        p-2
        gap-x-1
      `}
      style={{
        backgroundColor: box ? '#F3F4F6' : 'transparent',
        flexDirection: box ? 'column' : 'row',
        alignItems: box ? '' : 'center'
      }}
    >
      <span
        className={`
          font-bold
          text-black
        `}
        style={{
          fontSize: box ? '1.25rem' : '1rem'
        }}
      >
        {value}
      </span>
      <span
        className={`
          text-sm
          text-gray-500
          mr-1
          line-clamp-1
        `}
      >
        {name}
      </span>
    </div>
  )
}
