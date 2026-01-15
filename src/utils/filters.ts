/* Pure functions for transforming data. */

import moment from 'moment'

function toCurrency (n: number | string): string {
  const num = n.toString().split('.')
  const decimal = num[1] ? `.${num[1]}` : ''
  return '$' + num[0].replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,') + decimal
}

function capitalize (text: string): string {
  if (!text) return text
  return text[0].toUpperCase() + text.slice(1)
}

function toMMMMYYYY (text: string | Date): string {
  return moment(text).format('MMMM  YYYY')
}

function toGMapQuery (address: string): string {
  return `https://www.google.com/maps?q=${address.replace(/\s/g, '+')}`
}

function toUpperMagnitude (num: number): number {
  return Math.pow(10, num.toString().length)
}

export { toCurrency, toMMMMYYYY, capitalize, toGMapQuery, toUpperMagnitude }
