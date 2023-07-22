import RatingProduct from '@/components/RatingProduct'
import { Product as ProductType } from '@/types/product.type'
import { formatPrice, formatSold } from '@/utils/utils'
import { Link } from 'react-router-dom'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  return (
    <Link to={'/'}>
      <div className='rounded-md bg-white shadow transition-transform duration-100 hover:translate-y-[-0.03rem] hover:shadow-md'>
        {/* Image */}
        <div className='relative w-full pt-[100%]'>
          <img src={product.image} alt={product.name} className='absolute left-0 top-0 h-full w-full object-fill' />
        </div>
        <div className='overflow-hidden p-2'>
          {/* Title Product */}
          <div className='min-h-[32px] text-xs line-clamp-2'>{product.name}</div>
          {/* Price  */}
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-sm text-gray-300 line-through'>
              <span className='text-xs'>đ</span>
              <span>{formatPrice(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-sm text-primary'>
              <span className='text-xs'>đ</span>
              <span>{formatPrice(product.price)}</span>
            </div>
          </div>
          {/* Review */}
          <div className='mt-3 flex items-center justify-start'>
            <RatingProduct rating={product.rating} />
            <div className='ml-2 flex items-center text-sm'>
              <div className='mr-1'>Đã bán</div>
              <span>{formatSold(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
