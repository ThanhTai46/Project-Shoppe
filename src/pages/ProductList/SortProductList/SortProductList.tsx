import { orderBy, sortBy } from '@/constants/product'
import { ParamsProduct } from '@/types/product.type'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from '@/constants/path'
interface Props {
  queryConfig: ParamsProduct
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ParamsProduct['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ParamsProduct['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...(queryConfig as any),
        sort_by: sortByValue
      }).toString()
    })
  }

  const handlePriceOrder = (orderBy: Exclude<ParamsProduct['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...(queryConfig as any),
        sort_by: sortBy.price,
        order: orderBy
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between'>
        <div className='flex flex-wrap items-center gap-3'>
          <span className='text-gray-primary'>Sắp xếp theo</span>
          <button
            onClick={() => handleSort(sortBy.view)}
            className={classNames('rounded-sm px-3 py-2', {
              'bg-primary text-white hover:bg-primary/60': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
          >
            Phổ Biến
          </button>
          <button
            onClick={() => handleSort(sortBy.createdAt)}
            className={classNames('rounded-sm px-3 py-2', {
              'bg-primary text-white hover:bg-primary/60': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
          >
            Mới Nhất
          </button>
          <button
            onClick={() => handleSort(sortBy.sold)}
            className={classNames('rounded-sm px-3 py-2', {
              'bg-primary text-white hover:bg-primary/60': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
          >
            Bán Chạy
          </button>
          <select
            className='h-8 bg-white px-4 text-sm capitalize outline-none'
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value as Exclude<ParamsProduct['order'], undefined>)}
          >
            <option disabled>Giá</option>
            <option value={orderBy.asc}>Giá: Thấp đến cao</option>
            <option value={orderBy.desc}>Giá: Cao đến thấp</option>
          </select>
        </div>

        <div className='flex  items-center gap-4'>
          <div>
            <span className='text-primary'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex items-center justify-center'>
            {page === 1 ? (
              <span className='mr-[1px] flex h-8 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/40 px-3 shadow-md '>
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
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...(queryConfig as any),
                    page: (page - 1).toString()
                  }).toString()
                }}
              >
                <div className='mr-[1px] flex h-8 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow-md'>
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
                </div>
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex h-8 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow-md hover:bg-slate-100'>
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
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...(queryConfig as any),
                    page: (page + 1).toString()
                  }).toString()
                }}
              >
                <div className='flex h-8 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow-md hover:bg-slate-100'>
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
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
