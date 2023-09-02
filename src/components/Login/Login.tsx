import authAPI from '@/api/auth'
import Error from '@/components/common/ErrorMessage/Error'
import Button from '@/components/common/button/Button'
import Input from '@/components/common/input/Input'
import ToggleSignIn from '@/components/common/toggleSignin/ToggleSignIn'
import { AppContext } from '@/contexts/app.context'
import { signInSchema } from '@/libs/validations/signIn.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormData = {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()

  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema)
  })

  const handleLoginMutation = useMutation({
    mutationFn: (data: FormData) => authAPI.loginAccount(data)
  })

  const onSubmit = (data: FormData) => {
    handleLoginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
        toast.success(data.data.message)
      },
      onError: (error: any) => toast.error(error?.message)
    })
  }
  const isLoading = handleLoginMutation.isLoading

  return (
    <div className='bg-primary'>
      <div className='container-1040'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-14 '>
          <div className='lg:col-span-2 lg:col-start-4 lg:px-5'>
            <div className='rounded-md bg-white px-[30px] py-[40px]'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <span className='text-gray block text-[20px] font-normal'>Đăng nhập</span>
                <div className='mt-8'>
                  <Input type='email' name='email' register={register} placeholder='Email/Tên đăng nhập' />
                  <Error message={errors.email?.message} />
                </div>
                <div className='my-4'>
                  <Input type='password' name='password' register={register} placeholder='Mật khẩu' />
                  <Error message={errors.password?.message} />
                </div>
                <Button isLoading={isLoading} className='w-full py-3'>
                  Đăng nhập
                </Button>
              </form>
              <div className='mt-[10px] flex items-center justify-between'>
                <Link to='#' className='text-[.75rem] text-[#05a] '>
                  Quên mật khẩu
                </Link>

                <Link to='#' className='text-[.75rem] text-[#05a] '>
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
