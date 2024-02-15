import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { AiOutlineLoading } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { open } from '@tauri-apps/api/shell'
import { getConfig, setConfig } from '@/utils/files'
import { isTokenValid, getTokens } from '@/utils/auth'

export default function Login () {
  const onClick = () => {
    open('https://github.com/amoraschi/WuolApp')
  }

  const [showError, setShowError] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const router = useRouter()

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    setLoggingIn(true)
    setShowError(false)
    const userLogin = localStorage.getItem('userLogin')

    if (userLogin != null && await isTokenValid(JSON.parse(userLogin))) {
      await setConfig({ user: JSON.parse(userLogin) })
      router.replace('/dashboard')
      return
    }

    const config = await getConfig()
    if (config?.user != null && await isTokenValid(config.user)) {
      localStorage.setItem('userLogin', JSON.stringify(config.user))
      router.replace('/dashboard')
      return
    }

    const username = document.querySelector('input[placeholder="Correo"]') as HTMLInputElement
    const password = document.querySelector('input[placeholder="Contraseña"]') as HTMLInputElement

    if (username == null || password == null || username?.value === '' || password?.value === '') {
      setLoggingIn(false)
      setShowError(true)
      return
    }

    const tokens = await getTokens(username.value, password.value)
    if (tokens == null) {
      setLoggingIn(false)
      setShowError(true)
      return
    }

    setLoggingIn(false)
    await setConfig({
      user: {
        username: username.value,
        password: password.value,
        ...tokens
      }
    })

    localStorage.setItem('userLogin', JSON.stringify({
      username: username.value,
      password: password.value,
      ...tokens
    }))

    router.replace('/dashboard')
  }

  return (
    <>
      <form
        className={`
          grid
          gap-1
        `}
        onSubmit={onSubmit}
      >
        <div>
          <span
            className={`
              text-4xl
              font-extrabold
              text-black
            `}
          >
            Wuol
          </span>
          <span
            className={`
              text-4xl
              font-extrabold
              text-white
              bg-black
              rounded-sm
              ml-0.5
              px-1
            `}
          >
            App
          </span>
        </div>
        <input
          className={`
            px-4
            py-2
            border-2
            border-black
            rounded-md
            text-black
            outline-none
            focus:border-blue-500
            focus:shadow-md
            focus:ring-2
            transition-all
            duration-300
          `}
          placeholder='Correo'
        />
        <input
          className={`
            px-4
            py-2
            border-2
            border-black
            rounded-md
            text-black
            outline-none
            focus:border-blue-500
            focus:shadow-md
            focus:ring-2
            transition-all
            duration-300
          `}
          placeholder='Contraseña'
          type='password'
        />
        <div
          className={`
            grid
            grid-cols-2
            gap-2
          `}
        >
          <span
            className={`
              font-semibold
              text-sm
              text-red-500
            `}
          >
            {
              showError ? (
                'Invalid credentials'
              ) : (
                loggingIn ? (
                  <div
                    className={`
                      flex
                      items-center
                      h-full
                    `}
                  >
                    <span
                      className={`
                        text-blue-700
                        text-2xl
                      `}
                    >
                      <AiOutlineLoading
                        className={`
                          animate-spin
                        `}
                      />
                    </span>
                  </div>
                ) : (
                  ''
                )
              )
            }
          </span>
          <button
            className={`
              ml-auto
              px-4
              py-2
              bg-blue-700
              border-2
              border-blue-700
              rounded-md
              font-semibold
              hover:bg-white
              hover:text-blue-700
              transition-all
              duration-200
            `}
            onClick={onSubmit}
          >
            Login
          </button>
        </div>
      </form>
      <div
        className={`
          absolute
          bottom-0
          left-0
          m-2
          hover:scale-110
          transition-all
          duration-300
        `}
      >
        <span
          className={`
            text-black
            text-3xl
            cursor-pointer
          `}
          onClick={onClick}
        >
          <FaGithub />
        </span>
      </div>
    </>
  )
}
