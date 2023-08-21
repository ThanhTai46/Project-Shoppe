import productAPI from '@/api/product'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import RatingProduct from '@/components/RatingProduct'
import { formatPrice, formatSold, generateIdFromNameId, percentDiscount } from '@/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ParamsProduct, Product as TypeProduct, Product as ProductType } from '@/types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from '@/components/common/QuantityController'
import purchaseApi from '@/api/purchase'
import { queryClient } from '@/main'
import { purchaseStatus } from '@/constants/purchase'
import { toast } from 'react-toastify'

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState<number>(1)
  const { nameId } = useParams()
  const { data: dataProduct } = useQuery({
    queryKey: ['product', generateIdFromNameId(nameId as string)],
    queryFn: () => productAPI.detailProduct(generateIdFromNameId(nameId as string))
  })

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })
  const categoryId = dataProduct?.data.data.category._id

  // Get Product Related
  const queryConfig: ParamsProduct = {
    page: '1',
    limit: 20,
    category: categoryId
  }
  const { data: listProduct } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productAPI.getProduct(queryConfig),
    keepPreviousData: true,
    enabled: Boolean(dataProduct),
    staleTime: 3 * 60 * 1000
  })

  const imageRef = useRef<HTMLImageElement>(null)
  const product: TypeProduct = dataProduct?.data.data
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const currentImages = useMemo(() => (product ? product.images.slice(...currentIndexImages) : []), [product])

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImages[1] < product.images.length) {
      setCurrentIndexImages((prev) => {
        return [prev[0] + 1, prev[1] + 1]
      })
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => {
        return [prev[0] - 1, prev[1] - 1]
      })
    }
  }

  const handleZoomImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý đc bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta k xử lý đc bubble evnet
    const offsetX = event.pageX - (rect.x + window.screenX)
    const offsetY = event.pageY - (rect.y + window.screenY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    // Lấy giá trị width và height của bức ảnh
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveMouse = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { product_id: product._id, buy_count: buyCount },
      {
        onSuccess: () => {
          toast.success('Thêm thành công vào giỏ hàng')
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
        }
      }
    )
  }

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [])

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container-1200'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoomImage}
                onMouseLeave={handleRemoveMouse}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  onClick={prev}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img: any) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={img.name}
                        className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange-600' />}
                    </div>
                  )
                })}

                <button
                  onClick={next}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='border-b-orange text-orange mr-1 border-b'></span>
                  <RatingProduct
                    rating={product.rating}
                    activeClassname='fill-orange-500 text-orange-500 h-4 w-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatSold(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{formatPrice(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange-500'>đ{formatPrice(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange-500 px-1 py-[2px] text-xs font-semibold uppercase text-white '>
                  giảm {percentDiscount(product.price_before_discount, product.price)}
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  value={buyCount}
                  max={product.quantity}
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange-500 bg-[#FFF5F1] px-5 capitalize text-orange-500 shadow-sm hover:bg-[#ffc5b22e]'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange-500 text-orange-500'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='fkex hover:bg-orange/90 ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange-500 px-5 capitalize text-white shadow-sm outline-none'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container-1200'>
          <div className=' bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div
              className='mx-4 mb-4 mt-12 text-sm leading-loose'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container-1200'>
          <div className='uppercase text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</div>
          {listProduct && (
            <>
              <div className='mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {listProduct?.data.data.products.map((product: ProductType) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
