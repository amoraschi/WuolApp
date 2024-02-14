import { Files } from '@/types/Files'
import { fetchNewPosts } from '@/utils/data'
import { useEffect, useState } from 'react'
import MediumText from '../Text/MediumText'
import Post from './Post'

export default function NewPostList () {
  const [posts, setPosts] = useState<Files | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getNewPosts = async () => {
      const storedPosts = localStorage.getItem('newPosts')
      if (storedPosts != null) {
        console.log(JSON.parse(storedPosts))
        setPosts(JSON.parse(storedPosts))
        return
      }

      const res = await fetchNewPosts('5', abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem('newPosts', JSON.stringify(res))
      setPosts(res)
    }

    getNewPosts()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <>
      {
        posts == null ? (
          <></>
        ) : (
          <div
            className={`
              w-fit
            `}
          >
            <MediumText
              value='PUBLICACIONES'
            />
            <div
              className={`
                grid
                pt-2
                w-fit
              `}
            >
              {
                posts.items.map((user, index) => (
                  <Post
                    key={index}
                    post={user}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </>
  )
}
