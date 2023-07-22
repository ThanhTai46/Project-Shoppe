export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: Category
  image: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  _id: string
  name: string
}

export interface ProductList {
  products: Product[]
  pagination: Pagination
}

export interface Pagination {
  page: number
  limit: number
  page_size: number
}

export interface ParamsProduct {
  limit?: number | string
  page?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'desc' | 'asc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
}
