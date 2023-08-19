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


export const percentDiscount = (original: number, sale: number) => {
  return Math.round((((original - sale) / original) * 100)) + "%"
}

const removeSpecialCharacter = (str: string) => {
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "")
}


export const generateNameId = ({ name, id }: { name: string, id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`
}

export const generateIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i,");
  return arr[arr.length - 1];
}