import { Course } from '@/types/Courses'
import { deltaDays } from '@/utils/math'
import { useRouter } from 'next/navigation'
import { GoFileDirectory } from 'react-icons/go'

interface CoursesTabProps {
  course: Course
}

export default function CoursesTab ({ course }: CoursesTabProps) {
  const router = useRouter()

  const onClick = () => {
    localStorage.setItem('selected', `${course.id}`)
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
            lin
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
          <span
            className={`
              text-sm
              text-gray-500
            `}
          >
            {course.course}º CURSO
          </span>
          <span
            className={`
              md:block
              hidden
              text-sm
              text-gray-500
              bg-gray-200
              rounded-sm
              px-1
            `}
          >
            {course.numFiles} archivos
          </span>
          <span
            className={`
              md:block
              hidden
              text-sm
              text-gray-500
              bg-gray-200
              rounded-sm
              px-1
            `}
          >
            Última publicación hace {deltaDays(new Date(course.updatedAt))} días
          </span>
        </div>
      </div>
    </div>
  )
}
