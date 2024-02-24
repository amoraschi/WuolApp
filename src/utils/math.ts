import { User } from '@/types/User'

export function roundMoney (value: number) {
  return value.toFixed(2)
}

export function moneyString (selfData: User, value: number) {
  return `${roundMoney(value)} €`
}

export function roundToThousands (value: number) {
  if (value < 1000) {
    return value
  }

  return Math.round(value / 1000 * 10) / 10
}

export function roundToThousandsString (value: number) {
  if (value < 1000) {
    return value.toString()
  }

  return `${roundToThousands(value)}K`
}

export function deltaDays (date: Date) {
  return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
}

export function dateString (date: Date) {
  return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function localeMoney (value: number) {
  return value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
}

export function dateTimeString (date: Date) {
  return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
}
