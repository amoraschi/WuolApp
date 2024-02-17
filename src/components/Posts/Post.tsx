import { useState } from 'react'
import { GoComment, GoCommentDiscussion } from 'react-icons/go'
import { SingleFile } from '@/types/Files'
import { fetchFile, fetchFileData } from '@/utils/data'
import { dateString } from '@/utils/math'
import SmallTextBox from '../Text/SmallTextBox'
import UserImage from '../User/UserImage'
import PostLinks from './PostLinks'
import MediumText from '../Text/MediumText'
import { useRouter } from 'next/router'
import { message } from '@tauri-apps/api/dialog'

const fileIdRegex = /-(\d+)\?/

interface PostProps {
  post: SingleFile
}

export default function Post ({ post }: PostProps) {
  const router = useRouter()

  const fileIdMatch = post.contentUrl != null ? post.contentUrl.match(fileIdRegex) : null
  const fileId = fileIdMatch != null ? fileIdMatch[1] : null

  const onClick = () => {
    const getFileData = async () => {
      if (fileId == null) {
        return
      }

      const res = await fetchFileData(fileId)
      if (res == null) {
        return
      }

      localStorage.setItem('selected-file', JSON.stringify(res))
      router.replace('/files/file')
    }

    getFileData()
  }

  return (
    <div
      className={`
        flex
        items-center
        p-2
        gap-2
        rounded-md
        hover:bg-gray-100
        hover:shadow-md
        transition-all
        duration-200
      `}
    >
      <span
        className={`
          text-2xl
          text-black
        `}
      >
        {
          post.entitySubtype === 'doubt' ? (
            <GoCommentDiscussion />
          ) : (
            <GoComment />
          )
        }
      </span>
      <div
        title={post.description ?? ''}
      >
        <MediumText
          content={post.description ?? 'Sin descripción'}
          black
          clamp={1}
        />
        <div
          className={`
            flex
            items-center
            gap-2
          `}
        >
          <UserImage
            src={post.profile?.avatarUrl ?? '/wuolapp_square.png'}
            fallbackSrc={post.profile?.fallbackAvatarUrl ?? '/wuolapp_square.png'}
            alt={'Avatar'}
            width={5}
            height={5}
          />
          <SmallTextBox
            content={post.profile?.nickname ?? 'Anónimo'}
            noBackground
          />
          <SmallTextBox
            content={dateString(new Date(post.createdAt))}
          />
          {
            post.contentUrl == null ? (
              <></>
            ) : (
              <PostLinks
                onClick={onClick}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}
