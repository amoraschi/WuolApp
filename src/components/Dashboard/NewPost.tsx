import { message, save } from '@tauri-apps/api/dialog'
import { open } from '@tauri-apps/api/shell'
import { writeBinaryFile } from '@tauri-apps/api/fs'
import Image from 'next/image'
import { useState } from 'react'
import { GoComment, GoCommentDiscussion, GoDownload, GoFileSymlinkFile } from 'react-icons/go'
import { Item } from '@/types/NewPosts'
import { downloadBinaryFile, fetchFileData } from '@/utils/data'
import { AiOutlineLoading } from 'react-icons/ai'
import { dateString } from '@/utils/math'

const fileIdRegex = /-(\d+)\?/
interface NewPostProps {
  post: Item
}

export default function NewPost ({ post }: NewPostProps) {
  const [downloadingNow, setDownloadingNow] = useState(false)

  const fileIdMatch = post.contentUrl != null ? post.contentUrl.match(fileIdRegex) : null
  const fileId = fileIdMatch != null ? fileIdMatch[1] : null

  const onClick = () => {
    if (post.contentUrl != null) {
      open(post.contentUrl)
    }
  }

  const downloadFile = async () => {
    if (downloadingNow) {
      return
    }

    setDownloadingNow(true)
    if (fileId == null) {
      setDownloadingNow(false)
      return
    }

    console.log('Downloading', fileId)
    const res = await fetchFileData(parseInt(fileId))
    if (res == null) {
      message('Error al descargar el archivo.\n\nIntente entrar a https://wuolah.com y resolver el captcha.', { title: 'WuolApp', type: 'error' })
      setDownloadingNow(false)
      return
    }

    const filePath = await save({
      filters: [{
        name: res.extension.toUpperCase(),
        extensions: [res.extension]
      }]
    })

    if (filePath == null) {
      setDownloadingNow(false)
      return
    }

    const binary = await downloadBinaryFile(res.url)
    await writeBinaryFile(filePath, binary)
    console.log('File saved', filePath)
    setDownloadingNow(false)
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
      <div>
        <span
          className={`
            text-black
            font-semibold
            line-clamp-1
          `}
          title={post.description}
        >
          {post.description}
        </span>
        <div
          className={`
            flex
            items-center
            gap-2
          `}
        >
          <Image
            src={post.profile.avatarUrl ?? '/wuolapp-small.png'}
            alt={post.description}
            width={5}
            height={5}
            className={`
              rounded-full
              w-5
              h-5
              object-cover
            `}
          />
          <span
            className={`
              text-sm
              text-gray-500
              line-clamp-1
            `}
          >
            {post.profile.nickname ?? 'Anónimo'}
          </span>
          <span
            className={`
              xl:block
              hidden
              text-sm
              text-gray-500
              bg-gray-200
              rounded-sm
              px-1
            `}
          >
            {dateString(new Date(post.createdAt))}
          </span>
          {
            post.contentUrl == null ? (
              <></>
            ) : (
              <>
                <span
                  className={`
                    text-xl
                    text-gray-500
                    cursor-pointer
                    hover:text-black
                    hover:scale-110
                    transition-all
                    duration-150
                  `}
                  onClick={onClick}
                >
                  <GoFileSymlinkFile />
                </span>
                <span
                  className={`
                    text-xl
                    text-gray-500
                    cursor-pointer
                    hover:text-black
                    hover:scale-110
                    transition-all
                    duration-150
                  `}
                  onClick={downloadFile}
                >
                  {
                    downloadingNow ? (
                      <span>
                        <AiOutlineLoading
                          className={`
                            animate-spin
                          `}
                        />
                      </span>
                    ) : (
                      <GoDownload />
                    )
                  }
                </span>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}
