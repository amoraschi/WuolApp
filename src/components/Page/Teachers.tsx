import { TeachersData } from '@/types/Teachers'
import MediumText from '../Text/MediumText'
import Teacher from '../Teacher/Teacher'

interface TeachersProps {
  community: TeachersData
  global: TeachersData
}

export default function Teachers ({ community, global }: TeachersProps) {
  console.log(community, global)
  return (
    <div
      className={`
        absolute
        inset-0
        shadow-md
        left-64
        h-full
        flex
        flex-col
        overflow-y-auto
        p-8
        gap-4
      `}
    >
      <MediumText
        content='PROFESORES EN TU COMUNIDAD'
      />
      <div
        className={`
          grid
          grid-cols-4
          gap-4
        `}
      >
        {
          community.items.map((teacher, index) => (
            <Teacher
              key={index}
              teacher={teacher}
            />
          ))
        }
      </div>
      <MediumText
        content='OTROS PROFESORES DESTACADOS'
      />
      <div
        className={`
          grid
          grid-cols-4
          gap-4
        `}
      >
        {
          global.items.map((teacher, index) => (
            <Teacher
              key={index}
              teacher={teacher}
            />
          ))
        }
      </div>
    </div>
  )
}
