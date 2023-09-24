import Input from '@/components/common/input/Input'
import { Controller, useFormContext } from 'react-hook-form'
import { FormData } from './Profile'
import InputNumber from '@/components/common/InputNumber'

export default function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            register={register}
            name='name'
            placeholder='Tên'
            errorMessage={errors.address?.message}
          />
        </div>
      </div>

      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <InputNumber
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Số điện thoại'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            register={register}
            name='address'
            placeholder='Địa chỉ'
            errorMessage={errors.address?.message}
          />
        </div>
      </div>
    </>
  )
}
