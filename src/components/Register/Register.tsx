import Error from '@/components/common/ErrorMessage/Error'
import Button from '@/components/common/button/Button'
import Input from '@/components/common/input/Input'
import ToggleSignIn from '@/components/common/toggleSignin/ToggleSignIn'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { registerSchema } from '@/libs/validations/register.schema'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '@/api/auth'
import { omit } from 'lodash'

type FormData = yup.InferType<typeof registerSchema>

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const handleRegisterFunction = useMutation({
    mutationFn: (body: Omit<FormData, 'passwordConfirmation'>) => registerAccount(body)
  })
  const onSubmit = (data: FormData) => {
    const result = omit(data, ['passwordConfirmation'])
    handleRegisterFunction.mutate(result, {
      onSuccess: (data) => console.log(data)
    })
  }

  return (
    <div className='bg-primary'>
      <div className='container-1040'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-14 '>
          <div className='lg:col-span-2 lg:col-start-4 lg:px-5'>
            <div className='py-[40px] px-[30px] bg-white rounded-md'>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <span className='text-[20px] font-normal text-gray block '>Đăng ký</span>
                <div className='mt-8'>
                  <Input name='email' control={control} placeholder='Email/Tên đăng nhập' />
                  <Error message={errors.email?.message} />
                </div>
                <div className='mt-2'>
                  <Input type='password' name='password' placeholder='Mật khẩu' control={control} />
                  <Error message={errors.password?.message} />
                </div>
                <div className='mt-2'>
                  <Input
                    control={control}
                    type='password'
                    name='passwordConfirmation'
                    placeholder='Nhập lại mật khẩu'
                  />
                  <Error message={errors.passwordConfirmation?.message} />
                </div>
                <Button type='submit'>Đăng ký</Button>
              </form>
              <ToggleSignIn page='register' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
