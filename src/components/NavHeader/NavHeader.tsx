import { Link } from 'react-router-dom'
import Popover from '../Popover'

export default function NavHeader() {
  const classItem = 'flex cursor-pointer items-center py-1 hover:text-white/70'

  const listLanguage: React.ReactNode = (
    <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
      <div className='flex flex-col py-2 pr-28 pl-3'>
        <button className='py-2 px-3 text-[14px] font-normal text-left hover:text-primary'>Tiếng Việt</button>
        <button className='mt-2 py-2 px-3 text-[14px] font-normal text-left hover:text-primary'>English</button>
      </div>
    </div>
  )

  const itemSetting = (
    <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
      <Link
        to={'/profile'}
        className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
      >
        Tài khoản của tôi
      </Link>
      <Link to={''} className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'>
        Đơn mua
      </Link>
      <button className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'>
        Đăng xuất
      </button>
    </div>
  )

  return (
    <div className='flex justify-end'>
      {/* Notification */}
      <div className={`${classItem} mr-1`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
          />
        </svg>

        <span className='mx-1 text-basic'>Thông báo</span>
      </div>

      {/* Question */}
      <div className={`${classItem} mr-4`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
          />
        </svg>
        <span className='mx-1 text-basic'>Hỗ Trợ</span>
      </div>

      {/* Language */}
      <Popover className={classItem} renderPopover={listLanguage}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1 text-basic'>Tiếng việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>

      <Popover className={`ml-6 ${classItem}`} renderPopover={itemSetting}>
        <div className='w-6 h-6 mr-2'>
          <img
            src='https://down-vn.img.susercontent.com/file/sg-11134004-7qvd2-lhpzdhqg1d87d4_tn'
            alt='avatar'
            className='w-full h-full rounded-full object-cover'
          />
        </div>
        <span className='text-sm font-normal'>Taile ne</span>
      </Popover>

      {/* Login */}
      {/* <div className='flex items-center'>
        <Link to='/' className='mx-3 capitalize hover:text-white/70 text-[13px] font-medium'>
          Đăng ký
        </Link>
        <div className='h-4 border-r-[1px] border-r-white/40'></div>
        <Link to='/' className='mx-3 capitalize hover:text-white/70 text-[13px] font-medium'>
          Đăng nhập
        </Link>
      </div> */}
    </div>
  )
}
