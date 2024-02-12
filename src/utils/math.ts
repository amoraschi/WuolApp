import { WuolahUser } from '@/types/WuolahUser'
import { currencies } from './constants'

export function roundMoney (value: number) {
  return value.toFixed(2)
}

export function moneyString (selfData: WuolahUser, value: number) {
  return `${roundMoney(value)} ${currencies.find(currency => currency.country === selfData?.defaultCommunity?.community?.segmentations?.countryCode?.id)?.symbol ?? '€'}`
}

export function roundToThousands (value: number) {
  return Math.round(value / 1000 * 10) / 10
}

export function deltaDays (date: Date) {
  return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
}

export function dateString (date: Date) {
  return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}
