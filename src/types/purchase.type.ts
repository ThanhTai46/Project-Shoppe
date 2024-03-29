import { Product } from "./product.type"
import { User } from "./user"

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5
export type PurchaseListStatus = PurchaseStatus | 0;

export type Purchase = {
    _id: string
    buy_count: number
    price: number
    price_before_discount: number
    status: PurchaseStatus
    user: User
    product: Product
    createdAt: string
    updatedAt: string
}