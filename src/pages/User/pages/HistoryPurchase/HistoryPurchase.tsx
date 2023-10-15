import { purchaseStatus } from '@/constants/purchase'
import useQueryParams from '@/hooks/useQueryParams'
import TabLink from './TabLink'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from '@/api/purchase'
import { PurchaseListStatus } from '@/types/purchase.type'
import HistoryItem from './HistoryItem'

const purchaseTabs = [
  { status: purchaseStatus.all, name: 'Tất cả' },
  { status: purchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchaseStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchaseStatus.inProgress, name: 'Đang giao' },
  { status: purchaseStatus.delivered, name: 'Đã giao' },
  { status: purchaseStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchaseStatus.all

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchase', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })
  return (
    <div className='min-w-[700px]'>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
        <TabLink purchaseTabs={purchaseTabs} currentStatus={status} />

      </div>
      <div>
        <HistoryItem purchasesInCartData={purchasesInCartData?.data as any} />
      </div>
    </div>
  )
}
