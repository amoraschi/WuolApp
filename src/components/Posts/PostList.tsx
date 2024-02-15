import { Files } from '@/types/Files'
import { fetchPosts } from '@/utils/data'
import { useEffect, useState } from 'react'
import MediumText from '../Text/MediumText'
import Post from './Post'

export default function NewPostList () {
  const [posts, setPosts] = useState<Files | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const getPosts = async () => {
      const storedPosts = localStorage.getItem('posts')
      if (storedPosts != null) {
        console.log(JSON.parse(storedPosts))
        setPosts(JSON.parse(storedPosts))
        return
      }

      const res = await fetchPosts('5', abortController.signal)
      if (res == null) {
        return
      }

      localStorage.setItem('posts', JSON.stringify(res))
      setPosts(res)
    }

    getPosts()

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
              content='PUBLICACIONES'
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
