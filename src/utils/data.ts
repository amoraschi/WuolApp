import { FileData, UserLogin, UserStats } from '@/utils/constants'
import { WuolahUser } from '@/types/WuolahUser'
import { Leaderboard } from '@/types/Leaderboard'
import { NewPosts } from '@/types/NewPosts'
import { Courses } from '@/types/Courses'

let cachedTokens: UserLogin | null
let cachedSelfData: WuolahUser | null

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

export async function getSelfData (): Promise<WuolahUser | null> {
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

export async function fetchSelfData (signal: AbortSignal): Promise<WuolahUser | null> {
  const tokens = await getTokens()
  if (tokens == null) {
    return null
  }

  const res = await fetch('https://api.wuolah.com/v2/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchLeaderboard (pageSize: string, signal: AbortSignal): Promise<Leaderboard | null> {
  const tokens = await getTokens()
  if (tokens == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/rankings/users?populate[0]=user&pagination[page]=0&pagination[pageSize]=${pageSize}&filter[communityId]=13639&filter[criteria]=community`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchNewPosts (pageSize: string, signal: AbortSignal): Promise<NewPosts | null> {
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
    signal
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function fetchFileData (fileId: number): Promise<FileData | null> {
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
    })
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
}

export async function downloadBinaryFile (dataURL: string): Promise<Uint8Array> {
  const res = await fetch(dataURL)
  const blob = await res.blob()

  const arrayBuffer = await blob.arrayBuffer()
  const binary = new Uint8Array(arrayBuffer)

  return binary
}

export async function fetchUserStats (signal: AbortSignal): Promise<UserStats | null> {
  const tokens = await getTokens()
  const selfData = await getSelfData()
  if (tokens == null || selfData == null) {
    return null
  }

  const res = await fetch(`https://api.wuolah.com/v2/user-stats/${selfData.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    },
    signal
  })

  if (res.status !== 200) {
    return null
  }

  return res.json()
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
    signal
  })

  console.log(res)
  if (res.status !== 200) {
    return null
  }

  return res.json()
}
