import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import path from '@/utils/path'
interface Props {
  page: string
}

export default function ToggleSignIn({ page }: Props) {
  const [toggle, setToggle] = useState(page)

  const handleToggle = useCallback(() => {
    setToggle(toggle === 'login' ? 'register' : 'login')
  }, [toggle])

  return (
    <span className='mt-4 block text-center text-[14px] font-normal text-gray-400'>
      {toggle === 'login' ? 'Bạn mới biết đến Shopee? ' : 'Bạn đã có tài khoản? '}
      <Link
        to={toggle === 'login' ? path.register : path.login}
        className='font-medium text-primary'
        onClick={handleToggle}
      >
        {toggle === 'login' ? 'Đăng ký' : 'Đăng nhập'}
      </Link>
    </span>
  )
}
