import { message } from '@tauri-apps/api/dialog'

export const currencies = [
  {
    country: 'ES',
    currency: 'EUR',
    symbol: '€'
  },
  {
    country: 'CL',
    currency: 'CLP',
    symbol: '$'
  },
  {
    country: 'AR',
    currency: 'AR',
    symbol: '$'
  },
  {
    country: 'MX',
    currency: 'MXN',
    symbol: '$'
  },
  {
    country: 'CO',
    currency: 'COP',
    symbol: '$'
  },
  {
    country: 'IT',
    currency: 'EUR',
    symbol: '€'
  },
  {
    country: 'PE',
    currency: 'PEN',
    symbol: 'S/'
  }
]

export const endpoints: Record<string, string> = {
  RANKINGS: 'https://api.wuolah.com/v2/rankings/users',
  TEACHERS: 'https://api.wuolah.com/v2/live-classrooms/teachers'
}

export async function messageDialog (content: string, title: string, type: 'info' | 'error' | 'warning') {
  return message(content, { title, type })
}
