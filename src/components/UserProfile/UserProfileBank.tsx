import { useState } from 'react'
import { open } from '@tauri-apps/api/shell'
import { moneyString } from '@/utils/math'
import { User } from '@/types/User'
import MediumText from '@/components/Text/MediumText'
import { EyeIcon } from '@/components/Icons/EyeIcon'
import UserProfileBankValue from '@/components/UserProfile/UserProfileBankValue'
import Button from '@/components/Text/Button'

interface UserProfileBankProps {
  user: User
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
          content='SALDO'
        />
        <EyeIcon
          show={showMoney}
          setShow={setShowMoney}
        />
      </div>
      <div
        className={`
          grid
          gap-2
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
        <Button
          content='RECARGAR'
          onClick={onClick}
        />
      </div>
    </>
  )
}
