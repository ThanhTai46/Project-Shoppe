export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between'>
        <div className='flex flex-wrap items-center gap-3'>
          <span className='text-gray-primary'>Sắp xếp theo</span>
          <button className='h rounded-sm bg-white px-3 py-2'>Phổ Biến</button>
          <button className='rounded-sm bg-white px-3 py-2'>Mới Nhất</button>
          <button className='rounded-sm bg-primary px-3 py-2 text-white hover:bg-primary/80'>Bán Chạy</button>
          <select className='h-8 bg-white px-4 text-sm capitalize outline-none'>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>

        <div className='flex  items-center gap-4'>
          <div>
            <span className='text-primary'>1</span>
            <span>/9</span>
          </div>
          <div className='ml-2'>
            <button className='mr-[1px] h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/40 px-3 shadow-md '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='h-8 rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow-md hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
