import { NewPosts } from '@/types/NewPosts'
import { fetchNewPosts } from '@/utils/data'
import { useEffect, useState } from 'react'
import NewPost from './NewPost'

export default function NewPostList () {
  const [newPosts, setNewPosts] = useState<NewPosts | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getNewPosts = async () => {
      const storedNewPosts = localStorage.getItem('newPosts')
      if (storedNewPosts != null) {
        setNewPosts(JSON.parse(storedNewPosts))
        return
      }

      const res = await fetchNewPosts('5', abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem('newPosts', JSON.stringify(res))
      setNewPosts(res)
    }

    getNewPosts()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      {
        newPosts == null ? (
          <></>
        ) : (
          <div
            className={`
              w-fit
            `}
          >
            <span
              className={`
                text-md
                font-semibold
                text-gray-700
              `}
            >
              PUBLICACIONES
            </span>
            <div
              className={`
                flex
                flex-col
                pt-2
              `}
            >
              {
                newPosts.items.map((user, index) => (
                  <NewPost
                    key={index}
                    post={user}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}
