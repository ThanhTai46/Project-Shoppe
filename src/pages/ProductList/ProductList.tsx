import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import useQueryParams from '@/hooks/useQueryParams'
import productAPI from '@/api/product'
import Product from './Product'
import { Product as ProductType } from '@/types/product.type'
import Pagination from '@/components/Pagination'
import { useState } from 'react'

export default function ProductList() {
  const queryParams = useQueryParams()
  const [page, setPage] = useState(1)
  const { data: listProduct } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productAPI.getProduct(queryParams)
  })

  return (
    <section className='min-h-screen bg-secondary py-6'>
      <div className='container-1200 grid grid-cols-12 gap-4'>
        <div className='col-span-2 mr-2'>
          <AsideFilter />
        </div>
        <div className='col-span-10 mt-4'>
          <SortProductList />
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {listProduct &&
              listProduct?.data.data.products.map((product: ProductType) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
          </div>
          <Pagination page={page} setPage={setPage} pageSize={20} />
        </div>
      </div>
    </section>
  )
}
