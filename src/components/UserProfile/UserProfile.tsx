import { User } from '@/types/User'
import UserImage from '../User/UserImage'
import SmallTextBox from '../Text/SmallTextBox'
import { deltaDays } from '@/utils/math'
import UserProfileStats from './UserProfileStats'
import MediumText from '../Text/MediumText'
import UserProfileBank from './UserProfileBank'

interface UserProfileProps {
  user: User
}

export default function UserProfile ({ user }: UserProfileProps) {
  return (
    <div>
      <MediumText
        content='PERFIL'
      />
      <div
        className={`
          grid
          place-items-center
          pt-2
        `}
      >
        <UserImage
          src={user.avatarUrl}
          fallbackSrc={user.fallbackAvatarUrl}
          alt={`Avatar de ${user.nickname}`}
          width={32}
          height={32}
        />
        <span
          className={`
            text-lg
            font-bold
            text-black
          `}
        >
          {user.nickname}
        </span>
        <SmallTextBox
          content={`Se unió hace ${deltaDays(new Date(user.createdAt))} días`}
        />
        <UserProfileStats
          user={user}
        />
      </div>
      <UserProfileBank
        user={user}
      />
    </div>
  )
}
