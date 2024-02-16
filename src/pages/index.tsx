import { useEffect } from 'react'
import { getConfig } from '@/utils/files'
import Login from '@/components/Page/Login'

export default function LoginPage () {
  useEffect(() => {
    localStorage.clear()

    const fillForm = async () => {
      const config = await getConfig()
      if (config == null || config?.user == null) {
        return
      }

      const username = document.querySelector('input[placeholder="Correo"]') as HTMLInputElement
      const password = document.querySelector('input[placeholder="Contraseña"]') as HTMLInputElement

      if (username == null || password == null) {
        return
      }

      username.value = config.user.username
      password.value = config.user.password
    }

    fillForm()
  }, [])

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
      <Login />
    </main>
  )
}
