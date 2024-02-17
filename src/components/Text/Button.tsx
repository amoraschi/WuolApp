interface ButtonProps {
  content: string
  onClick: () => void
}

export default function Button ({ content, onClick }: ButtonProps) {
  return (
    <button
      className={`
        bg-blue-500
        font-bold
        w-fit
        py-2
        px-4
        rounded-md
        hover:bg-blue-600
        transition-all
        duration-200
      `}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
