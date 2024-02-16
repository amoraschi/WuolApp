import Error from '@/components/Page/Error'

export default function ErrorPage () {
  return (
    <main
      className={`
        absolute
        inset-0
        grid
        place-items-center
        bg-white
      `}
    >
      <Error />
    </main>
  )
}
