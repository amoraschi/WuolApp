import { UserLogin } from '@/types/Common'
import { User, UserBookmarks } from '@/types/User'
import { Files, FileData, FileDownloadData, FolderData } from '@/types/Files'
import { Courses } from '@/types/Courses'

let cachedTokens: UserLogin | null
let cachedSelfData: User | null

export async function getTokens (): Promise<UserLogin | null> {
  if (cachedTokens != null) {
    return cachedTokens
  }

  const tokens = localStorage.getItem('userLogin')
  if (tokens == null) {
    return null
  }

  cachedTokens = JSON.parse(tokens)
  return cachedTokens
}

export async function getSelfData (): Promise<User | null> {
  if (cachedSelfData != null) {
    return cachedSelfData
  }

  const selfData = localStorage.getItem('selfData')
  if (selfData == null) {
    return null
  }

  cachedSelfData = JSON.parse(selfData)
  return cachedSelfData
}

export async function fetchSelfData (signal: AbortSignal): Promise<User | null> {
  const tokens = await getTokens()
  if (tokens == null) {
    return null
  }

  const res = await fetch('https://api.wuolah.com/v2/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal,
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function handleSelfData (setSelfData: (data: User | null) => void, signal: AbortSignal) {
  const storedSelfData = localStorage.getItem('selfData')
  if (storedSelfData != null) {
    setSelfData(JSON.parse(storedSelfData))
    return
  }

  const res = await fetchSelfData(signal)
  if (res == null) {
    return
  }

  localStorage.setItem('selfData', JSON.stringify(res))
  setSelfData(res)
}

export async function fetchPosts (pageSize: string, signal: AbortSignal): Promise<Files | null> {
  const tokens = await getTokens()
  const selfData = await getSelfData()
  if (tokens == null || selfData == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/search/communities/${selfData.defaultCommunityId}/artifacts?entityType[0]=social&populate[0]=profile&populate[1]=subject&pagination[size]=${pageSize}&pagination[offset]=0`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal,
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchFile (fileId: number, signal?: AbortSignal): Promise<FileDownloadData | null> {
  const tokens = await getTokens()
  if (tokens == null) {
    return null
  }

  const res = await fetch('https://api.wuolah.com/v2/view', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    body: JSON.stringify({
      fileId
    }),
    signal,
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchFileURL (response: FileDownloadData, signal: AbortSignal): Promise<string | null> {
  const res = await fetch(response.url, {
    signal
  })

  if (res.status !== 200) {
    return null
  }

  const blob = await res.blob()
  return URL.createObjectURL(blob)
}

export async function fetchCourses (pageSize: string, signal: AbortSignal): Promise<Courses | null> {
  const tokens = await getTokens()
  const selfData = await getSelfData()
  if (tokens == null || selfData == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/communities/${selfData.defaultCommunityId}/subjects?populate[0]=subject&pagination[page]=0&pagination[pageSize]=${pageSize}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal,
    cache: 'no-store'
  })

  console.log(res)
  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchCourseFiles (id: string, subjectId: string, searchText: string | null, pageSize: string, signal: AbortSignal) {
  const tokens = await getTokens()
  const selfData = await getSelfData()
  if (tokens == null || selfData == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/search/subjects/${subjectId}/artifacts?communityId=${selfData.defaultCommunityId}&course=${id}&sort=recently&populate[0]=profile&pagination[size]=${pageSize}&pagination[offset]=0${searchText != null ? `&searchText=${searchText}` : ''}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal,
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchFileData (fileId: string): Promise<FileData | null> {
  const tokens = await getTokens()
  if (tokens == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/documents/${fileId}?populate[0]=user&populate[1]=community&populate[2]=community.center&populate[3]=community.university&populate[4]=study&populate[5]=subject`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchFolderData (entityId: string): Promise<FolderData | null> {
  const tokens = await getTokens()
  if (tokens == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/documents?filter[uploadId]=${entityId}&populate[0]=user&pagination[pageSize]=20`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function bookmarkFile (fileId: string, bookmark: boolean): Promise<any> {
  const tokens = await getTokens()
  if (tokens == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/me/documents/${fileId}/bookmark`, {
    method: bookmark ? 'PUT' : 'DELETE',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchBookmarked (signal?: AbortSignal): Promise<UserBookmarks | null> {
  const tokens = await getTokens()
  const selfData = await getSelfData()
  if (tokens == null || selfData == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/me/documents/bookmark?populate[0]=document&populate[1]=document.user&populate[2]=document.subject&pagination[pageSize]=250&filter[communityId]=${selfData.defaultCommunityId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal,
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchGiveaways (communityId: string, signal: AbortSignal) {
  const tokens = await getTokens()
  if (tokens == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/giveaways?filter[communityId]=${communityId}&filter[status]=in_progress&pagination[page]=0&pagination[pageSize]=25`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal,
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchWithAuth (url: string, signal: AbortSignal) {
  const tokens = await getTokens()
  if (tokens == null) {
    return null
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal,
    cache: 'no-store'
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}
