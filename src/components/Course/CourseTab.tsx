import { Course } from '@/types/Courses'
import { deltaDays } from '@/utils/math'
import { useRouter } from 'next/navigation'
import { GoFileDirectory } from 'react-icons/go'
import SmallTextBox from '../Text/SmallTextBox'

interface CourseTabProps {
  course: Course
}

export default function CourseTab ({ course }: CourseTabProps) {
  const router = useRouter()

  const onClick = () => {
    localStorage.setItem('selected-course', `${course.id}`)
    router.replace('/courses/course')
  }

  return (
    <div
      className={`
        flex
        items-center
        p-4
        mx-4
        gap-4
        rounded-md
        cursor-pointer
        hover:bg-gray-100
        hover:shadow-md
        transition-all
        duration-200
      `}
      onClick={onClick}
    >
      <span
        className={`
          text-2xl
          text-black
        `}
      >
        <GoFileDirectory />
      </span>
      <div
        className={`
          flex
          flex-col
        `}
      >
        <span
          className={`
            text-lg
            text-black
            font-semibold
          `}
        >
          {course.subject.name}
        </span>
        <div
          className={`
            flex
            gap-2
          `}
        >
          <SmallTextBox
            content={`${course.course}º CURSO`}
            noBackground
          />
          <SmallTextBox
            content={`${course.numFiles} archivos`}
          />
          <SmallTextBox
            content={`Última publicación hace ${deltaDays(new Date(course.updatedAt))} días`}
          />
        </div>
      </div>
    </div>
  )
}
