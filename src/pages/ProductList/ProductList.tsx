import categoryAPI from '@/api/category'
import productAPI from '@/api/product'
import Pagination from '@/components/Pagination'
import useQueryConfig from '@/hooks/useQueryConfig'
import { Product as ProductType } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'

export default function ProductList() {
  const queryConfig = useQueryConfig();

  const { data: listProduct } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productAPI.getProduct(queryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  })

  const { data: categories } = useQuery({
    queryKey: ['categories', queryConfig],
    queryFn: () => categoryAPI.getCategory(),
    keepPreviousData: true
  })

  return (
    <section className='min-h-screen bg-secondary py-6'>
      <div className='container-1200 grid grid-cols-12 gap-4'>
        <div className='col-span-2 mr-2'>
          {categories && <AsideFilter queryConfig={queryConfig} categories={categories?.data.data || []} />}
        </div>
        <div className='col-span-10 mt-4'>
          {listProduct && (
            <SortProductList queryConfig={queryConfig} pageSize={listProduct.data.data.pagination.page_size} />
          )}
          {listProduct && (
            <>
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {listProduct?.data.data.products.map((product: ProductType) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={listProduct.data.data.pagination.page_size} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
