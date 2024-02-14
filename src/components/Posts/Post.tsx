import { message, save } from '@tauri-apps/api/dialog'
import { open } from '@tauri-apps/api/shell'
import { writeBinaryFile } from '@tauri-apps/api/fs'
import Image from 'next/image'
import { useState } from 'react'
import { GoComment, GoCommentDiscussion, GoDownload, GoFileSymlinkFile } from 'react-icons/go'
import { File } from '@/types/Files'
import { downloadBinaryFile, fetchFile, fetchFileData } from '@/utils/data'
import { AiOutlineLoading } from 'react-icons/ai'
import { dateString } from '@/utils/math'
import SmallTextBox from '../Text/SmallTextBox'
import UserImage from '../User/UserImage'
import PostLinks from './PostLinks'
import MediumText from '../Text/MediumText'

const fileIdRegex = /-(\d+)\?/
interface PostProps {
  post: File
}

export default function Post ({ post }: PostProps) {
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

    const fileData = await fetchFileData(fileId)
    const fileDownloadData = await fetchFile(parseInt(fileId))
    if (fileDownloadData == null || fileData == null) {
      message(`Error al descargar el archivo.\n\nIntente entrar a ${post.contentUrl} y resolver el captcha.`, { title: 'WuolApp', type: 'error' })
      setDownloadingNow(false)
      return
    }

    // const filePath = await save({
    //   filters: [{
    //     name: fileDownloadData.extension.toUpperCase(),
    //     extensions: [fileDownloadData.extension]
    //   }]
    // })

    // if (filePath == null) {
    //   setDownloadingNow(false)
    //   return
    // }

    const binary = await downloadBinaryFile(fileDownloadData.url, fileData.name)
    if (binary == null) {
      message(`Error al descargar el archivo.\n\nIntente entrar a ${post.contentUrl} y resolver el captcha.`, { title: 'WuolApp', type: 'error' })
      setDownloadingNow(false)
      return
    }

    message('Archivo descargado con éxito.', { title: 'WuolApp', type: 'info' })
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
        <MediumText
          value={post.description ?? 'Sin descripción'}
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
            src={post.profile.avatarUrl}
            fallbackSrc={post.profile.fallbackAvatarUrl}
            alt={'Avatar'}
            width={5}
            height={5}
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
          <SmallTextBox
            content={dateString(new Date(post.createdAt))}
          />
          {
            post.contentUrl == null ? (
              <></>
            ) : (
              <PostLinks
                downloadingNow={downloadingNow}
                onClick={onClick}
                downloadFile={downloadFile}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}
