interface TextIconProps {
  content: string
  icon: JSX.Element
}

export default function TextIcon ({ content, icon }: TextIconProps) {
  return (
    <div
      className={`
        flex
        rounded-md
        border
        border-gray-200
        gap-2
        p-4
        text-black
      `}
    >
      <span
        className={`
          text-2xl
          text-blue-500
        `}
      >
        {icon}
      </span>
      <span
        className={`
          text-sm
          line-clamp-3
        `}
        title={content}
      >
        {content}
      </span>
    </div>
  )
}
