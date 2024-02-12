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

export interface FileData {
  extension: string
  url: string
  viewId: string
}

export interface UserStats {
  numDownloads: number
  numFiles: number
  numFolloweds: number
  numFollowers: number
  numPaidDownloads: number
}
