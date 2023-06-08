import { loginAccount } from '@/api/auth'
import Error from '@/components/common/ErrorMessage/Error'
import Button from '@/components/common/button/Button'
import Input from '@/components/common/input/Input'
import ToggleSignIn from '@/components/common/toggleSignin/ToggleSignIn'
import { signInSchema } from '@/libs/validations/signIn.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormData = {
  email: string
  password: string
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema)
  })

  const handleLoginMutation = useMutation({
    mutationFn: (data: FormData) => loginAccount(data)
  })

  const onSubmit = (data: FormData) => {
    handleLoginMutation.mutate(data, {
      onSuccess: (data) => toast.success(data.data.message),
      onError: (error: any) => toast.error(error?.message)
    })
  }

  return (
    <div className='bg-primary'>
      <div className='container-1040'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-14 '>
          <div className='lg:col-span-2 lg:col-start-4 lg:px-5'>
            <div className='py-[40px] px-[30px] bg-white rounded-md'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <span className='text-[20px] font-normal text-gray block '>Đăng nhập</span>
                <div className='mt-8'>
                  <Input type='email' name='email' control={control} placeholder='Email/Tên đăng nhập' />
                  <Error message={errors.email?.message} />
                </div>
                <div className='my-4'>
                  <Input type='password' name='password' control={control} placeholder='Mật khẩu' />
                  <Error message={errors.password?.message} />
                </div>
                <Button className='w-full py-3'>Đăng nhập</Button>
              </form>
              <div className='mt-[10px] flex justify-between items-center'>
                <Link to='#' className='text-[#05a] text-[.75rem] '>
                  Quên mật khẩu
                </Link>

                <Link to='#' className='text-[#05a] text-[.75rem] '>
                  Đăng nhập với SMS
                </Link>
              </div>

              <ToggleSignIn page='login' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
