import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  isLoading?: boolean
  children?: React.ReactNode
}
export default function Button({ className, children, type, isLoading = false, ...rest }: Props) {
  return (
    <>
      <button
        type={type}
        disabled={isLoading}
        className={`${className} rounded-sm bg-primary text-white ${isLoading && 'cursor-not-allowed opacity-70'}`}
        {...rest}
      >
        {isLoading ? (
          <div className='mx-auto h-7 w-7 animate-spin rounded-full border-4 border-t-4 border-white border-t-transparent'></div>
        ) : (
          children
        )}
      </button>
    </>
  )
}
