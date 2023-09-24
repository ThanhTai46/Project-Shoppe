import path from '@/constants/path'
import { formatPrice, generateNameId } from '@/utils/utils'
import { Link } from 'react-router-dom'


export default function HistoryItem({ purchasesInCartData }: any) {
    return (
        <>
            {purchasesInCartData?.data?.map((purchase: any) => (
                <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                    <Link to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`} className='flex'>
                        <div className='flex-shrink-0'>
                            <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                        </div>
                        <div className='ml-3 flex-grow overflow-hidden'>
                            <div className='truncate'>{purchase.product.name}</div>
                            <div className='mt-3'>x{purchase.buy_count}</div>
                        </div>

                        <div className='ml-3 flex-shrink-0'>
                            <span className='truncate text-gray-500 line-through'>
                                ₫{formatPrice(purchase.product.price_before_discount)}
                            </span>
                            <span className='ml-2 truncate text-orange-500'>₫{formatPrice(purchase.product.price)}</span>
                        </div>
                    </Link>

                    <div className='flex justify-end'>
                        <div>
                            <span>Tổng giá tiền</span>
                            <span className='ml-4 text-xl text-orange-500'>
                                ₫{formatPrice(purchase.product.price * purchase.buy_count)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}
