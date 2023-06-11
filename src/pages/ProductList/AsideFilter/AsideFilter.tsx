import Button from '@/components/common/button/Button'
import Input from '@/components/common/input/Input'
import path from '@/utils/path'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function AsideFilter() {
  const { control } = useForm()
  return (
    <>
      <div className='mt-4'>
        <Link to={path.home} className='flex items-center text-base font-bold'>
          <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
            <g fillRule='evenodd' stroke='none' strokeWidth='1'>
              <g transform='translate(-373 -208)'>
                <g transform='translate(155 191)'>
                  <g transform='translate(218 17)'>
                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          Tất cả danh mục
        </Link>
        <div className='my-4 h-[1px] bg-gray-300'></div>
        <ul>
          <li className='py-2 pl-2 text-sm'>Thời Trang Nam</li>
          <li className='py-2 pl-2 text-sm'>
            <Link to={path.home} className='relative text-primary'>
              <svg viewBox='0 0 4 7' className='absolute left-[-14px] top-[6px] h-2 w-2 fill-primary'>
                <polygon points='4 3.5 0 0 0 7'></polygon>
              </svg>
              Áo Vest và Blazer
            </Link>
          </li>

          <li className='py-2 pl-2 text-sm'>
            <Link to={path.home} className=''>
              Áo Hoodie, Áo Len & Áo Nỉ
            </Link>
          </li>
        </ul>
      </div>
      <div className='mt-4'>
        <Link to={path.home} className='flex items-center font-bold uppercase'>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
            className='mr-3 h-4 w-3 fill-current stroke-current'
          >
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          Bộ lọc tìm kiếm
        </Link>
        <div className='my-4 h-[1px] bg-gray-300 text-sm font-medium'></div>

        <div className='my-5'>
          <div className='my-5'>Khoảng giá</div>
          <form>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Input
                  placeholder='₫ TỪ'
                  name='minPrice'
                  control={control}
                  className='w-full rounded-sm border border-gray-300 !p-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
                <div className='mx-3 h-[1px] flex-1 bg-[#bdbdbd]'>
                  <span className='invisible'>-</span>
                </div>
                <Input
                  placeholder='₫ ĐẾN'
                  name='maxPrice'
                  control={control}
                  className='w-full rounded-sm border border-gray-300 !p-2 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
              <Button className='py-2 text-sm'>ÁP DỤNG</Button>
            </div>
          </form>
        </div>
        <div className='my-4 h-[1px] bg-gray-300 text-sm font-medium'></div>
        <div className='text-sm'>Đánh giá</div>
        <ul className='my-3'>
          <li className='py-1 pl-2'>
            <Link to='/' className='my-2 flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              <span>Trở lên</span>
            </Link>
            <Link to='/' className='my-2 flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              <span>Trở lên</span>
            </Link>
          </li>
        </ul>

        <div className='my-4 h-[1px] bg-gray-300 text-sm font-medium'></div>
        <Button className='w-full py-2 text-sm'>XOÁ TẤT CẢ</Button>
      </div>
    </>
  )
}
