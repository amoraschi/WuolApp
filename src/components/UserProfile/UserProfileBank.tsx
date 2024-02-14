import { WuolahUser } from '@/types/User'
import MediumText from '../Text/MediumText'
import { EyeIcon } from '../Icons/EyeIcon'
import { useState } from 'react'
import UserProfileBankValue from './UserProfileBankValue'
import { moneyString } from '@/utils/math'
import { open } from '@tauri-apps/api/shell'

interface UserProfileBankProps {
  user: WuolahUser
}

export default function UserProfileBank ({ user }: UserProfileBankProps) {
  const [showMoney, setShowMoney] = useState(false)

  const onClick = () => {
    open('https://wuolah.com/profile/balance/withdraw')
  }

  return (
    <>
      <div
        className={`
          flex
          items-center
        `}
      >
        <MediumText
          value='SALDO'
        />
        <EyeIcon
          show={showMoney}
          setShow={setShowMoney}
        />
      </div>
      <div
        className={`
          grid
        `}
      >
        <UserProfileBankValue
          show={showMoney}
          value={moneyString(user, user.money)}
          main
          text=''
        />
        <UserProfileBankValue
          show={showMoney}
          value={moneyString(user, user.accumulated)}
          main={false}
          text='Saldo acumulado en tu cuenta: '
        />
        <button
          className={`
            mt-2
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
          RECARGAR
        </button>
      </div>
    </>
  )
}
