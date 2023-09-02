import { InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'
interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputNumberProps) {
  const { field, fieldState } = useController(props)
  const {
    name,
    control,
    value,
    type,
    onChange,
    className,
    classNameInput = 'p-1.5 text-xs w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    ...rest
  } = props
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')

    if (numberCondition || type !== 'number') {
      // Cập nhật localValue state
      setLocalValue(valueFromInput)
      // Gọi field.onChange để cập nhật vào state React Hook Form
      field.onChange(event)
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }
  return (
    <>
      <div className={className}>
        <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={value || localValue} />
        <div className={classNameError}>{fieldState.error?.message}</div>
      </div>
    </>
  )
}

export default InputV2
