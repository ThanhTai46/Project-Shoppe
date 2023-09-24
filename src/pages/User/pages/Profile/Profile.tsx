import userApi from '@/api/user'
import InputFile from '@/components/InputFile'
import Button from '@/components/common/button/Button'
import { config } from '@/constants/file'
import { TUserSchema, userSchema } from '@/libs/validations/user.schema'
import { hideEmail } from '@/utils/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import DateSelect from '../../components/DateSelect/DateSelect'
import Info from './Info'

export type FormData = Pick<TUserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

const ProfileDefaulValue: FormData = {
  name: '',
  address: '',
  phone: '',
  avatar: '',
  date_of_birth: new Date(1990, 0, 1)
}

export default function Profile() {
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const method = useForm<FormData>({
    defaultValues: ProfileDefaulValue,
    resolver: yupResolver(profileSchema)
  })

  const {
    watch,
    setValue,
    control,
    formState: { errors },
    handleSubmit
  } = method
  const avatar = watch('avatar')

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)

  const getAvatarUrl = (avatarName?: string) =>
    avatarName
      ? `${config.baseUrl}images/${avatarName}`
      : 'https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png'
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
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      await toast.success(res.data.message)
    } catch (error) {
      toast.error(error as any)
    }
  }

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <FormProvider {...method}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{hideEmail(profile?.email as string)}</div>
              </div>
            </div>
            {/* <Info /> */}
            <Info />
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
                <img
                  // src={previewImage || getAvatarUrl(avatar)}
                  src={previewImage || getAvatarUrl(avatar)}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <InputFile onChange={handleChangeFile} />
              <div className='mt-3 text-gray-400'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
