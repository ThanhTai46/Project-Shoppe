import Button from '@/components/common/button/Button'
import path from '@/constants/path'
import { searchPrice } from '@/libs/validations/search.schema'
import { Category, ParamsProduct } from '@/types/product.type'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import RatingStars from '../RatingStars/RatingStars'
import { omit } from 'lodash'
import InputV2 from '@/components/common/InputV2'

interface Props {
  queryConfig: ParamsProduct
  categories: Category[]
}

type FormData = {
  min_price: string
  max_price: string
}
export default function AsideFilter({ categories, queryConfig }: Props) {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      max_price: '',
      min_price: ''
    },
    shouldFocusError: false,
    resolver: yupResolver(searchPrice)
  })
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.max_price,
        price_min: data.min_price
      } as any).toString()
    })
  })

  const handleRemoveFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category']) as any
      ).toString()
    })
  }
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
          {categories.map((item: any) => {
            const isActive = item._id === category
            return (
              <li key={item._id} className='py-2 pl-2 text-sm'>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...(queryConfig as any),
                      category: item._id
                    }).toString()
                  }}
                  className={classNames(`relative`, {
                    'font-semibold text-primary': isActive
                  })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className='absolute left-[-14px] top-[6px] h-2 w-2 fill-primary'>
                      <polygon points='4 3.5 0 0 0 7'></polygon>
                    </svg>
                  )}
                  {item.name}
                </Link>
              </li>
            )
          })}
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
        <form onClick={onSubmit}>
          <div className='my-5'>
            <div className='my-5'>Khoảng giá</div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                {/* <Controller
                  control={control}
                  name='min_price'
                  render={({ field }) => {
                    return (
                      <InputNumber
                        {...field}
                        name='min_price'
                        onChange={(event: any) => {
                          field.onChange(event)
                          trigger('max_price')
                        }}
                        placeholder='₫ TỪ'
                        errorClassName='hidden'
                        className='w-full rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm'
                      />
                    )
                  }}
                /> */}
                <InputV2
                  name='min_price'
                  onChange={() => {
                    trigger('max_price')
                  }}
                  classNameError='hidden'
                  placeholder='₫ TỪ'
                  className='w-full rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm'
                  control={control}
                />

                <div className='mx-3 h-[1px] flex-1 bg-[#bdbdbd]'>
                  <span className='invisible'>-</span>
                </div>
                <InputV2
                  name='max_price'
                  onChange={() => {
                    trigger('min_price')
                  }}
                  classNameError='hidden'
                  placeholder='₫ ĐẾN'
                  className='w-full rounded-sm border border-gray-300 outline-none focus:border-gray-500 focus:shadow-sm'
                  control={control}
                />
              </div>
              <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.min_price?.message}</div>

              <Button className='py-2 text-sm'>ÁP DỤNG</Button>
            </div>
          </div>
        </form>
        <div className='my-4 h-[1px] bg-gray-300 text-sm font-medium'></div>
        <div className='text-sm'>Đánh giá</div>
        <ul className='my-3'>
          <RatingStars queryConfig={queryConfig} />
        </ul>
        <div className='my-4 h-[1px] bg-gray-300 text-sm font-medium'></div>
        <Button onClick={handleRemoveFilter} className='w-full py-2 text-sm'>
          XOÁ TẤT CẢ
        </Button>
      </div>
    </>
  )
}
