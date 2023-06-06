import { Control, Controller } from 'react-hook-form'

interface Props {
  name: string
  className?: string
  control: Control<any>
  placeholder?: string
  type?: string
}
export default function Input({ control, className, name, type, placeholder, ...textFieldProps }: Props) {
  console.log('control: ', control)
  return (
    <>
      <Controller
        name={name as string}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <input
              type={type}
              className={`${className} ${
                error ? 'focus:border-primary' : ''
              } focus:shadow-md text-sm border border-border-color outline-none focus:border-gray-500 placeholder:text-sm placeholder:opacity-60 text-gray p-[.75rem] w-full rounded-sm`}
              placeholder={placeholder}
              {...field}
              {...textFieldProps}
            />
          )
        }}
      />
    </>
  )
}