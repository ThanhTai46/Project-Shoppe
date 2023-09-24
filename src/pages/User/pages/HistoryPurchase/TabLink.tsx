import path from '@/constants/path'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'

type PurchaseTab = {
  status: string | number
  name: string
}
interface Props {
  currentStatus: string | number
  purchaseTabs: Array<PurchaseTab>
}
export default function TabLink({ currentStatus, purchaseTabs }: Props) {
  return purchaseTabs.map((item) => {
    return (
      <Link
        key={item.status}
        to={{
          pathname: path.historyPurchase,
          search: createSearchParams({
            status: String(item.status)
          }).toString()
        }}
        className={classNames(
          'flex flex-1  items-center justify-center border-b-2 bg-white py-4 text-center transition-colors duration-300',
          {
            ' border-b-orange-500 text-orange-500': currentStatus === item.status,
            'border-b-black/10 text-gray-900 ': currentStatus !== item.status
          }
        )}
      >
        {item.name}
      </Link>
    )
  })
}
