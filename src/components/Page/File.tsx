import { FileDownloadData, SingleFile } from '@/types/Files'
import LinkText from '../Text/LinkText'
import LargeText from '../Text/LargeText'
import SmallTextBox from '../Text/SmallTextBox'
import { dateString } from '@/utils/math'
import User from '../User/User'
import { useEffect, useState } from 'react'
import { fetchFile } from '@/utils/data'
import { message } from '@tauri-apps/api/dialog'
import LoadingIcon from '../Icons/LoadingIcon'

const fileIdRegex = /-(\d+)/

interface FileProps {
  file: SingleFile
}

export default function File ({ file }: FileProps) {
  const [fileDownloadData, setFileDownloadData] = useState<FileDownloadData | null>(null)

  const fileIdMatch = file.id != null ? file.id.match(fileIdRegex) : null
  const fileId = fileIdMatch != null ? fileIdMatch[1] : null

  useEffect(() => {
    console.log(fileId)
    if (fileId == null) {
      return
    }

    const storedFileDownloadData = localStorage.getItem(`fileDownloadData-${fileId}`)
    if (storedFileDownloadData != null) {
      const fileDownloadData = JSON.parse(storedFileDownloadData)
      setFileDownloadData(fileDownloadData)
      return
    }

    const abortController = new AbortController()
    const getFileData = async () => {
      console.log(fileId)
      const res = await fetchFile(parseInt(fileId), abortController.signal)
      if (res == null) {
        message(`Error al descargar el archivo.\n\nIntente entrar a cualquier archivo en Wuolah y resolver el captcha.`, { title: 'WuolApp', type: 'error' })
        return
      }

      console.log(res)
      setFileDownloadData(res)
      localStorage.setItem(`fileDownloadData-${fileId}`, JSON.stringify(res))
    }

    getFileData()

    return () => {
      abortController.abort()
    }
  }, [])

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
        px-8
        py-4
      `}
    >
      <LinkText
        href='/files'
        content='Volver'
      />
      <div
        className={`
          flex
          items-center
          justify-between
        `}
      >
        <LargeText
          content={file.title ?? 'Sin título'}
        />
        {
          file.profile == null ? (
            <></>
          ) : (
            <User
              user={file.profile}
              xp={file.profile?.popularity ?? 0}
              rank={0}
            />
          )
        }
      </div>
      <SmallTextBox
        content={`Subido el ${dateString(new Date(file.createdAt))}`}
      />
      {
        fileDownloadData == null ? (
          <LoadingIcon
            margin='1'
          />
        ) : (
          <iframe
            src={fileDownloadData.url}
            className={`
              mt-2
              h-full
              w-full
              rounded-md
            `}
          />
        )
      }
    </div>
  )
}
