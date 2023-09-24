import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  errorMessage?: string
  value: Date
  onChange?: (value: Date) => void
}
type DateSelect = {
  date: string | number
  month: string | number
  year: string | number
}
export default function DateSelect({ errorMessage, value, onChange }: Props) {
  const [date, setDate] = useState<DateSelect>({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFormSelect, name } = event.target
    const newDate = {
      ...date,
      [name]: Number(valueFormSelect)
    }

    setDate(newDate)
    onChange && onChange(new Date(newDate.year as number, newDate.month as number, newDate.date as number))
  }
  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            value={value?.getDate() || date.date}
            onChange={handleChange}
            placeholder='Ngày'
            name='date'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange-500'
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            placeholder='Tháng'
            name='month'
            value={value.getMonth() || date.month}
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange-500'
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>

          <select
            placeholder='Năm'
            onChange={handleChange}
            name='year'
            value={value.getFullYear() || date.year}
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange-500'
          >
            <option disabled>Năm</option>
            {range(1990, new Date().getFullYear() + 1).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
