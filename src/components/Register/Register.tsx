import Error from '@/components/common/ErrorMessage/Error';
import Button from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';
import ToggleSignIn from '@/components/common/toggleSignin/ToggleSignIn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerSchema } from '@/libs/validations/register.schema';
import { useMutation } from '@tanstack/react-query';
import { registerAccount } from '@/api/auth';
import { Omit, omit } from 'lodash';
import { isErrorUnprocessableEntity } from '@/utils/utils';
import { toast } from 'react-toastify';
import { ErrorResponse } from '@/types/utils';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '@/contexts/app.context';

type FormData = yup.InferType<typeof registerSchema>;

export default function Register() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AppContext);
  const handleRegisterFunction = useMutation({
    mutationFn: (body: Omit<FormData, 'passwordConfirmation'>) => registerAccount(body),
  });

  const onSubmit = (data: FormData) => {
    const result = omit(data, ['passwordConfirmation']);
    handleRegisterFunction.mutate(result, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        navigate('/');
        toast.success(data.data.message);
      },
      onError: (error) => {
        if (isErrorUnprocessableEntity<ErrorResponse<Omit<FormData, 'passwordConfirmation'>>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'server',
                message: formError[key as keyof Omit<FormData, 'passwordConfirmation'>],
              });
            });
          }
        }
      },
    });
  };

  return (
    <div className='bg-primary'>
      <div className='container-1040'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-14 '>
          <div className='lg:col-span-2 lg:col-start-4 lg:px-5'>
            <div className='rounded-md bg-white px-[30px] py-[40px]'>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <span className='text-gray block text-[20px] font-normal'>Đăng ký</span>
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
                <Button isLoading={handleRegisterFunction.isLoading} className='w-full py-3' type='submit'>
                  Đăng ký
                </Button>
              </form>
              <ToggleSignIn page='register' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
