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

export interface WuolahLogin {
  accessToken: string
  refreshToken: string
  expires: string
}

export interface UserLogin {
  username: string
  password: string
  accessToken: string
  refreshToken: string
  expires: string
}
