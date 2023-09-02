import userApi from '@/api/user'
import { useEffect } from 'react'
import InputNumber from '@/components/common/InputNumber'
import Button from '@/components/common/button/Button'
import Input from '@/components/common/input/Input'
import { TUserSchema, userSchema } from '@/libs/validations/user.schema'
import { hideEmail } from '@/utils/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { User } from '@/types/user'
import DateSelect from '../../components/DateSelect/DateSelect'
import { toast } from 'react-toastify'

// function Info() {
//   return (
//     <Fragment>
//       <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
//         <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
//         <div className='sm:w-[80%] sm:pl-5'>
//              <Input
//                 control={control}
//                 className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
//                 // register={register}
//                 name='address'
//                 placeholder='Địa chỉ'
//                 // errorMessage={errors.address?.message}
//               />
//             </div>
//         </div>
//       </div>
//       <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
//         <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
//         <div className='sm:w-[80%] sm:pl-5'></div>
//       </div>
//     </Fragment>
//   )
// }

type FormData = Pick<TUserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const ProfileDefaulValue: FormData = {
    name: '',
    address: '',
    phone: '',
    avatar: '',
    date_of_birth: new Date(1990, 0, 1)
  }
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: ProfileDefaulValue,
    resolver: yupResolver(profileSchema)
  })

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const profile = profileData?.data.data
  useEffect(() => {
    if (profile) {
      setValue('address', profile?.address)
      setValue('name', profile?.name)
      setValue('avatar', profile.avatar)
      setValue('phone', profile.phone)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile])
  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString()
      })
      await toast.success(res.data.message)
    } catch (error) {
      toast.error(error as any)
    }
  }
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>

      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{hideEmail(profile?.email as string)}</div>
            </div>
          </div>
          {/* <Info /> */}
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='name'
                placeholder='T'
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
          <Controller
            name='date_of_birth'
            control={control}
            render={({ field }) => (
              <DateSelect
                errorMessage={errors?.date_of_birth?.message}
                value={field.value as Date}
                onChange={field.onChange}
              />
            )}
          />
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='bg-orange hover:bg-orange/80 flex h-9 items-center rounded-sm px-5 text-center text-sm text-white'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <button
                className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
                type='button'
              >
                Chọn ảnh
              </button>
            </div>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
