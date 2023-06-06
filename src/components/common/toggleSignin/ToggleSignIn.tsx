import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ToggleSignIn({ page }: any) {
  const [toggle, setToggle] = useState(page)

  const handleToggle = useCallback(() => {
    setToggle(toggle === 'login' ? 'register' : 'login')
  }, [toggle])

  return (
    <span className='text-gray-400 text-[14px] font-normal text-center block mt-4'>
      {toggle === 'login' ? 'Bạn mới biết đến Shopee? ' : 'Bạn đã có tài khoản? '}
      <Link
        to={toggle === 'login' ? '/register' : '/login'}
        className='text-primary font-medium'
        onClick={handleToggle}
      >
        {toggle === 'login' ? 'Đăng ký' : 'Đăng nhập'}
      </Link>
    </span>
  )
}
