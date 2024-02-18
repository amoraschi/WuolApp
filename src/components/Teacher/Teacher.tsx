import { TeacherData } from '@/types/Teachers'
import User from '@/components/User/User'
import TextIcon from '../Icons/TextIcon'
import { GoCalendar, GoCheckbox, GoMortarBoard } from 'react-icons/go'
import SmallTextBox from '../Text/SmallTextBox'

interface TeacherProps {
  teacher: TeacherData
}

export default function Teacher ({ teacher }: TeacherProps) {
  const subjectsString = teacher.communitySubjects.filter(subject => subject.subject != null).map(subject => subject.subject.name ?? 'ERROR').join(', ')

  const price = teacher.prices.find(price => price.numClasses === 1)
  const priceWithCommission = (price?.pricePerClass?.amount ?? 0) + (price?.wuolahCommission?.amount ?? 0)

  return (
    <div
      className={`
        flex
        flex-col
        rounded-md
        border-2
        border-gray-200
        p-2
        gap-2
        hover:shadow-md
        transition-all
        duration-200
      `}
    >
      <div
        className={`
          flex
          items-center
          justify-between
          w-full
          h-fit
          gap-2
        `}
      >
        <User
          user={teacher.profile}
          xp={teacher.profile.popularity}
        />
        <SmallTextBox
          content={`${priceWithCommission / 100}€/h`}
          backgroundColor='#DCfCE7'
          color='#22C55E'
        />
      </div>
      <div
        className={`
          grid
          grid-rows-3
          gap-2
          h-full
        `}
      >
        <TextIcon
          content={teacher.notes}
          icon={<GoCheckbox />}
        />
        <TextIcon
          content={teacher.textAvailability}
          icon={<GoCalendar />}
        />
        <TextIcon
          content={subjectsString !== '' ? subjectsString : 'Sin asignaturas asignadas'}
          icon={<GoMortarBoard />}
        />
      </div>
    </div>
  )
}
