import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to={'/'}>
      <div className='rounded-md bg-white shadow transition-transform duration-100 hover:translate-y-[-0.03rem] hover:shadow-md'>
        {/* Image */}
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://down-vn.img.susercontent.com/file/4fc8b053494e69b543c09b9badfaae05_tn'
            alt=''
            className='absolute left-0 top-0 h-full w-full object-fill'
          />
        </div>
        <div className='overflow-hidden p-2'>
          {/* Title Product */}
          <div className='min-h-[32px] text-xs line-clamp-2'>
            Áo thun unisex ngắn tay không cổ in hình MARVEL STUDIO phong cách các tính - Bộ sưu tập áo phông mavel hợp
            thời trang
          </div>
          {/* Price  */}
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-300 line-through'>
              <span className='text-xs'>đ</span>
              <span>5.000</span>
            </div>
            <div className='ml-1 truncate text-primary'>
              <span className='text-xs'>đ</span>
              <span>2.000</span>
            </div>
          </div>
          {/* Review */}
          <div className='mt-3 flex items-center justify-start'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute left-0 top-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x='0'
                    y='0'
                    className='h-3 w-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                    ></polygon>
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x='0'
                  y='0'
                  className='h-3 w-3 fill-[#d5d5d5] text-[#d5d5d5]'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                  ></polygon>
                </svg>
              </div>
            </div>
            <div className='ml-2 flex items-center text-sm'>
              <div className='mr-1'>Đã bán</div>
              <span>5.66k</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
