import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'

export default function ProductList() {
  return (
    <section className='min-h-screen bg-secondary py-6'>
      <div className='container-1200 grid grid-cols-12 gap-4'>
        <div className='col-span-3 mx-6'>
          <AsideFilter />
        </div>
        <div className='col-span-9 mt-4'>
          <SortProductList />
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {Array(30)
              .fill(0)
              .map((_, index) => (
                <div key={index} className='col-span-1'>
                  <Product />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
