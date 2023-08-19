import { InputHTMLAttributes, forwardRef } from 'react'

export interface PropsInputNumber extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  className?: string
  errorClassName?: string
  onChange?: any
}

const inputDefaultClassName = 'text-gray w-full rounded-sm p-1 text-sm outline-none'

const InputNumber = forwardRef<HTMLInputElement, PropsInputNumber>(function InputNumberInner(
  { className, errorMessage, errorClassName = 'mt-1 text-red-600 min-h-[1.25rem] text-sm', onChange, ...rest },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <>
      <div className={className}>
        <input className={inputDefaultClassName && className} onChange={handleChange} {...rest} ref={ref} />
        <div className={errorClassName}>{errorMessage}</div>
      </div>
    </>
  )
})

export default InputNumber
