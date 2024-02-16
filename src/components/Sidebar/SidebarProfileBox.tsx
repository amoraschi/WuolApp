import { GoSignOut } from 'react-icons/go'
import { confirm } from '@tauri-apps/api/dialog'
import { User } from '@/types/User'
import UserImage from '../User/UserImage'
import { useRouter } from 'next/navigation'

interface SidebarProfileBoxProps {
  user: User
}

export default function SidebarProfileBox ({ user }: SidebarProfileBoxProps) {
  const router = useRouter()

  const onClick = () => {
    // Confirm operation

    const askConfirm = async () => {
      const result = await confirm('¿Estás seguro/a de que quieres cerrar sesión?')
      console.log(result)
      if (result) {
        localStorage.clear()
        router.replace('/')
      }
    }

    askConfirm()
  }

  return (
    <div
      className={`
        flex
        items-center
        h-16
        p-2
        gap-2
        rounded-md
        shadow-md
        bg-white
      `}
    >
      <UserImage
        src={user.avatarUrl}
        fallbackSrc={user.fallbackAvatarUrl}
        alt={`Avatar de ${user.nickname}`}
        width={10}
        height={10}
      />
      <div
        className={`
          flex
          flex-col
          w-full
        `}
      >
        <span
          className={`
            text-black
            font-semibold
            w-fit
          `}
        >
          {user.nickname.length > 15 ? `${user.nickname.slice(0, 15)}...` : (user.nickname ?? 'Wuolero')}
        </span>
        <span
          className={`
            text-gray-500
            text-sm
            line-clamp-1
          `}
        >
          {user.defaultCommunity?.community?.name ?? 'Wuolah'}
        </span>
      </div>
      <span
        className={`
          cursor-pointer
          text-black
          text-xl
          hover:scale-110
          transition-all
          duration-200
        `}
        onClick={onClick}
        title='Cerrar sesión'
      >
        <GoSignOut />
      </span>
    </div>
  )
}
