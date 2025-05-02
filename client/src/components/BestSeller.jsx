import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../contexts/AppContext'

const BestSeller = () => {

    const {products} = useAppContext()

  return products && (
    <div className='px-6 md:px-16 lg:px-32 mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
            {products.filter((product) => product.inStock === true).slice(0,5).map((product, index) => {
                return <ProductCard key={index} prod = {product}/>
            })}
        </div>
      
    </div>
  )
}

export default BestSeller
