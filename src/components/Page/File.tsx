import { FileData, FileDownloadData, SingleFile } from '@/types/Files'
import LinkText from '../Text/LinkText'
import LargeText from '../Text/LargeText'
import SmallTextBox from '../Text/SmallTextBox'
import { dateString } from '@/utils/math'
import User from '../User/User'
import { useEffect, useState } from 'react'
import { bookmarkFile, fetchBookmarked, fetchFile } from '@/utils/data'
import { message } from '@tauri-apps/api/dialog'
import LoadingIcon from '../Icons/LoadingIcon'
import CourseFileStats from '../Course/CourseFileStats'
import { GoBookmark, GoBookmarkFill } from 'react-icons/go'
import BookmarkIcon from '../Icons/BookmarkIcon'
import { UserBookmark } from '@/types/User'

const fileIdRegex = /-(\d+)/
const socialIdRegex = /-(\d+)\?/

const expireRegex = /Expires=(\d+)/

interface FileProps {
  file: FileData
}

export default function File ({ file }: FileProps) {
  const [fileDownloadData, setFileDownloadData] = useState<FileDownloadData | null>(null)
  const [fileError, setFileError] = useState(false)
  const [saveFile, setSaveFile] = useState(false)

  // const fileIdMatch = file.entityType === 'social' ? (file.contentUrl != null ? file.contentUrl.match(socialIdRegex) : null) : (file.id != null ? file.id.match(fileIdRegex) : null)
  const fileId = `${file.id}`

  const onClick = () => {
    if (fileId == null) {
      return
    }

    console.log('Saving file', fileId)
    const fetchBookmarkFile = async () => {
      const res = await bookmarkFile(fileId, !saveFile)
      if (res == null) {
        message(`Error al ${!saveFile ? 'guardar' : 'quitar'} el archivo ${!saveFile ? 'en' : 'de'} tus favoritos.`, { title: 'WuolApp', type: 'error' })
        return
      }

      setSaveFile(!saveFile)

      const bookmarkedFiles = await fetchBookmarked()
      console.log(bookmarkedFiles)
      if (bookmarkedFiles != null) {
        localStorage.setItem('bookmarkedFiles', JSON.stringify(bookmarkedFiles))
      }

      console.log(res)
    }

    fetchBookmarkFile()
  }

  useEffect(() => {
    setSaveFile(false)
    if (fileId == null) {
      setFileError(true)
      return
    }

    const storedBookmarkedFiles = localStorage.getItem('bookmarkedFiles')
    if (storedBookmarkedFiles != null) {
      const bookmarkedFiles = JSON.parse(storedBookmarkedFiles)
      const bookmarkedFile = bookmarkedFiles.data.find((bookmark: UserBookmark) => bookmark.documentId === parseInt(fileId))
      if (bookmarkedFile != null) {
        setSaveFile(true)
      }
    }

    const storedFileDownloadData = localStorage.getItem(`fileDownloadData-${fileId}`)
    console.log(storedFileDownloadData)
    if (storedFileDownloadData != null) {
      const fileDownloadData = JSON.parse(storedFileDownloadData)

      const expireMatch = fileDownloadData.url.match(expireRegex)
      if (expireMatch != null) {
        const expire = parseInt(expireMatch[1])
        if (expire < (Date.now() / 1000)) {
          localStorage.removeItem(`fileDownloadData-${fileId}`)
          return
        }
      }

      setFileDownloadData(fileDownloadData)
      return
    }

    const abortController = new AbortController()
    const getFileData = async () => {
      const res = await fetchFile(parseInt(fileId), abortController.signal)
      if (res == null) {
        setFileError(true)
        message(`Error al descargar el archivo.\n\nIntente entrar a cualquier archivo en Wuolah y resolver el captcha, o confirmar su correo.`, { title: 'WuolApp', type: 'error' })
        return
      }

      setFileDownloadData(res)
      setFileError(false)
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
        gap-1
      `}
    >
      <LinkText
        href={
          localStorage.getItem('selected-course') != null ? '/courses/course' : '/files'
        }
        content='Volver'
      />
      <div
        className={`
          flex
          items-center
          justify-between
          mt-1
        `}
      >
        <LargeText
          content={file.name ?? 'Sin título'}
        />
        <BookmarkIcon
          saveFile={saveFile}
          onClick={onClick}
        />
      </div>
      <div
        className={`
          flex
          items-center
          gap-2
        `}
      >
        <SmallTextBox
          content={`Subido el ${dateString(new Date(file.createdAt))}`}
        />
        {
          file.numViews == null ? (
            <></>
          ) : (
            <CourseFileStats
              downloads={file.numDownloads}
              paid={file.numPaidDownloads}
              views={file.numViews}
              bookmarks={file.numBookmarks}
            />
          )
        }
      </div>
      {
        fileError ? (
          <span
            className={`
              text-red-500
              text-lg
              font-semibold
              mt-2
            `}
          >
            Error al cargar el archivo
          </span>
        ) : (
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
        )
      }
    </div>
  )
}
