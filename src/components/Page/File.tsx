import { useEffect, useState } from 'react'
import Image from 'next/image'
import { save } from '@tauri-apps/api/dialog'
import { writeBinaryFile } from '@tauri-apps/api/fs'
import { bookmarkFile, fetchBookmarked, fetchFile, fetchFileURL } from '@/utils/data'
import { dateString } from '@/utils/math'
import { errorDialog, messageDialog } from '@/utils/constants'
import { FileData, FileDownloadData } from '@/types/Files'
import { UserBookmark } from '@/types/User'
import LinkText from '@/components/Text/LinkText'
import LargeText from '@/components/Text/LargeText'
import SmallTextBox from '@/components/Text/SmallTextBox'
import LoadingIcon from '@/components/Icons/LoadingIcon'
import CourseFileStats from '@/components/Course/CourseFileStats'
import BookmarkIcon from '@/components/Icons/BookmarkIcon'
import Button from '@/components/Text/Button'
import SmallTextError from '@/components/Text/SmallTextError'

// const fileIdRegex = /-(\d+)/
// const socialIdRegex = /-(\d+)\?/

const expireRegex = /Expires=(\d+)/

interface FileProps {
  file: FileData
}

export default function File ({ file }: FileProps) {
  console.log(file)
  const [fileDownloadData, setFileDownloadData] = useState<FileDownloadData | null>(null)
  const [fileError, setFileError] = useState(false)
  const [saveFile, setSaveFile] = useState(false)
  const [iframeURL, setIframeURL] = useState<string | null>(null)

  // const fileIdMatch = file.entityType === 'social' ? (file.contentUrl != null ? file.contentUrl.match(socialIdRegex) : null) : (file.id != null ? file.id.match(fileIdRegex) : null)
  const fileId = `${file.id}`

  const onClick = () => {
    if (fileId == null) {
      return
    }

    const fetchBookmarkFile = async () => {
      const res = await bookmarkFile(fileId, !saveFile)
      if (res == null) {
        errorDialog(`Error al ${!saveFile ? 'guardar' : 'quitar'} el archivo ${!saveFile ? 'en' : 'de'} tus favoritos.`)
        return
      }

      setSaveFile(!saveFile)

      const bookmarkedFiles = await fetchBookmarked()
      console.log(bookmarkedFiles)
      if (bookmarkedFiles != null) {
        localStorage.setItem('bookmarkedFiles', JSON.stringify(bookmarkedFiles))
      }
    }

    fetchBookmarkFile()
  }

  const downloadFile = async () => {
    const filePath = await save({
      filters: [{
        name: file.extension.toUpperCase(),
        extensions: [file.extension]
      }]
    })

    if (filePath == null) {
      return
    }

    const storedBlobURL = localStorage.getItem(`fileDownloadData-${fileId}`)
    if (storedBlobURL == null) {
      errorDialog('Error al descargar el archivo.')
      return
    }

    const blobURL = file.fileType.includes('image') ? JSON.parse(storedBlobURL).url : JSON.parse(storedBlobURL).blobURL
    if (blobURL == null) {
      errorDialog('Error al descargar el archivo.')
      return
    }

    const res = await fetch(blobURL)
    if (res.body == null) {
      errorDialog('Error al descargar el archivo.')
      return
    }

    const buffer = await res.arrayBuffer()
    await writeBinaryFile(filePath, new Uint8Array(buffer))
    messageDialog('Archivo descargado con éxito.', 'info')
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
      if (file.fileType.includes('image')) {
        setIframeURL(fileDownloadData.url)
      } else {
        setIframeURL(fileDownloadData.blobURL)
      }

      return
    }

    const abortController = new AbortController()
    const getFileData = async () => {
      const res = await fetchFile(parseInt(fileId), abortController.signal)
      if (res == null) {
        setFileError(true)
        errorDialog(`Error al descargar el archivo.\n\nIntente entrar a cualquier archivo en Wuolah y resolver el captcha, o confirmar su correo.`)
        return
      }

      const fileDataURL = await fetchFileURL(res, abortController.signal)
      if (fileDataURL == null) {
        setFileError(true)
        errorDialog(`Error al descargar el archivo.\n\nIntente entrar a cualquier archivo en Wuolah y resolver el captcha, o confirmar su correo.`)
        return
      }

      setFileDownloadData(res)

      if (file.fileType.includes('image')) {
        setIframeURL(res.url)
      } else {
        setIframeURL(fileDataURL)
      }

      setFileError(false)

      localStorage.setItem(`fileDownloadData-${fileId}`, JSON.stringify({
        url: res.url,
        blobURL: fileDataURL
      }))
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
          <SmallTextError
            content='Error al cargar el archivo'
          />
        ) : (
          fileDownloadData == null || iframeURL == null ? (
            <LoadingIcon
              margin='1'
            />
          ) : (
            <div
              className={`
                flex
                flex-col
                h-full
                mt-2
                gap-2
              `}
            >
              <Button
                content='DESCARGAR'
                onClick={downloadFile}
              />
              {
                file.extension !== 'pdf' ? (
                  file.fileType.includes('image') ? (
                    <Image
                      src={iframeURL}
                      alt={file.name}
                      width={500}
                      height={500}
                      className={`
                        w-full
                        h-full
                        object-contain
                      `}
                    />
                  ) : (
                    <SmallTextError
                      content='La previsualización de este archivo no está disponible'
                    />
                  )
                ) : (
                  <iframe
                    src={iframeURL}
                    className={`
                      h-full
                      w-full
                      rounded-md
                    `}
                  />
                )
              }
            </div>
          )
        )
      }
    </div>
  )
}
