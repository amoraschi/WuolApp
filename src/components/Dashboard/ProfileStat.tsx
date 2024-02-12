interface ProfileStat {
  data: string | number
  text: string
}

export default function ProfileStat ({ data, text }: ProfileStat) {
  return (
    <div
      className={`
        flex
        flex-col
        bg-gray-100
        rounded-md
        p-2
      `}
    >
      <span
        className={`
          text-xl
          font-bold
          text-black
        `}
      >
        {data}
      </span>
      <span
        className={`
          text-sm
          text-gray-500
          mr-1
          line-clamp-1
        `}
      >
        {text}
      </span>
    </div>
  )
}