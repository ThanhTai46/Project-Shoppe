import { Control, Controller } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  className?: string
  control: Control<any>
  inputType?: 'InputDefault' | 'InputSearch'
}
const inputDefaultClassName =
  ' text-gray w-full rounded-sm border border-border-color p-[.75rem] text-sm outline-none placeholder:text-sm placeholder:opacity-60 focus:border-gray-500 focus:shadow-md'

export default function Input({ control, className, name, inputType = 'InputDefault', ...textFieldProps }: Props) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <input
              className={`${className}
              ${inputType === 'InputDefault' && inputDefaultClassName}  
              ${error ? 'focus:border-primary' : ''}`}
              {...field}
              {...textFieldProps}
            />
          )
        }}
      />
    </>
  )
}
