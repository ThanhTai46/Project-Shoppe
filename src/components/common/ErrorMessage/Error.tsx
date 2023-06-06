interface Props {
  message?: string | undefined
}
export default function Error({ message }: Props) {
  return <div className='text-red-600 text-sm my-1 min-h-[1rem]'>{message}</div>
}
