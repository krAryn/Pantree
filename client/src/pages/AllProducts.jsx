import React, {memo} from 'react'
import { useAppContext } from '../contexts/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { products, searchQuery } = useAppContext()

  return (
    <div className="mt-16 flex flex-col px-6 md:px-16 lg:px-32">
      <div className="flex flex-col items-end w-max">
        <p className='text-2xl font-medium'>{!searchQuery ? "ALL PRODUCTS" : searchQuery + " Search Results:"}</p>
        {!searchQuery && <div className="w-16 h-0.5 bg-primary rounded-full"></div>}
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {products && (products.length === 0 ? (<div className='flex items-center justify-center h-[20vh]'><p className='text-2xl font-medium text-gray-400'> "No Results Found!" </p></div>) : products.map((product, index) => {
          return <ProductCard key={index} prod={product} />
        }))}
      </div>

    </div>
  )
}

export default memo(AllProducts)
