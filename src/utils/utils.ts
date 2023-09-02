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

export const hideEmail = (email: string) => {
  if (!isValidEmail(email)) {
    return "Invalid email";
  }

  // Tách phần username và domain
  const [username, domain] = email.split('@');

  // Chuyển đổi username thành địa chỉ ẩn
  const hiddenUsername = username.substring(0, 2) + '*'.repeat(username.length - 2);

  // Kết hợp username và domain để tạo địa chỉ email ẩn
  const hiddenEmail = `${hiddenUsername}@${domain}`;

  return hiddenEmail;
}

function isValidEmail(email: string) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}