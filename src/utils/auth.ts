import { WuolahLogin } from '@/types/Common'

export async function getTokens (username: string, password: string): Promise<WuolahLogin | null> {
  const response = await fetch('https://api.wuolah.com/login', {
    method: 'POST',
    body: JSON.stringify({
      account: username,
      password: password
    }),
    cache: 'no-store'
  })

  if (response.status !== 200) {
    return null
  }

  return response.json()
}

export async function isTokenValid (tokens: WuolahLogin): Promise<boolean> {
  const tokenExpiration = new Date(tokens.expires)

  if (tokenExpiration < new Date()) {
    return false
  }

  return true
}
