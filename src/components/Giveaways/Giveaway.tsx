import Image from 'next/image'
import { open } from '@tauri-apps/api/shell'
import { dateTimeString } from '@/utils/math'
import { GiveawayData } from '@/types/Giveaways'
import SmallTextBox from '@/components/Text/SmallTextBox'
import MediumText from '@/components/Text/MediumText'

interface GiveawayProps {
  giveaway: GiveawayData
}

export default function Giveaway ({ giveaway }: GiveawayProps) {
  const onClick = () => {
    open(`https://wuolah.com/giveaway/${giveaway.id ?? ''}`)
  }

  return (
    <div
      className={`
        flex
        flex-col
        border-2
        border-gray-200
        w-72
        p-2
        gap-2
        text-black
        rounded-md
        cursor-pointer
        hover:shadow-md
        transition-all
        duration-200
      `}
      onClick={onClick}
    >
      <Image
        src={giveaway.imgSrc ?? '/wuolapp_square.png'}
        alt={giveaway.title}
        width={300}
        height={300}
        className={`
          w-72
          h-72
          object-cover
        `}
      />
      <div
        className={`
          flex
          flex-col
          p-2
          gap-2
        `}
      >
        <span
          className={`
            text-xl
            font-semibold
          `}
        >
          {giveaway.title}
        </span>
        <span
          className={`
            text-md
            line-clamp-3
          `}
          title={giveaway.subtitle}
        >
          {giveaway.subtitle}
        </span>
        <MediumText
          content={`Termina el ${dateTimeString(new Date(giveaway.end))}`}
        />
        <SmallTextBox
          content={`Se han unido ${giveaway.participants} personas`}
        />
      </div>
    </div>
  )
}
