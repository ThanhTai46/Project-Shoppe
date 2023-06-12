import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isErrorUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('de-DE')
  return formatter.format(price)
}

export const formatSold = (sold: number) => {
  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
  return formatter.format(sold).replace('.', ',').toLowerCase()
}
