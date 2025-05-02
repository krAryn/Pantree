import React from 'react'
import { useAppContext } from "../contexts/AppContext"
import { useParams } from 'react-router'
import { categories } from '../assets/assets'
import ProductCard from './ProductCard'

const ProductCategory = () => {

    const { products } = useAppContext()
    const { category } = useParams();

    const searchCategory = categories.find((item) => item.path.toLowerCase() === category);

    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category)

    return (
        <div className='mt-16 px-6 md:px-16 lg:px-32 py-4'>
            {searchCategory && (
                <div className="flex flex-col items-end w-max">
                    <p className="text-2xl font-medium">{searchCategory.text.toUpperCase()}</p>
                    <div className="w-16 h-0.5 bg-primary rounded-full"></div>
                </div>
            )}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {filteredProducts && (filteredProducts.length === 0 ? (<div className='flex items-center justify-center h-[20vh]'><p className='text-2xl font-medium text-gray-400'> "No Results Found!" </p></div>): filteredProducts.map((product, index) => {
                    return <ProductCard key={index} prod={product} />
                }))}
            </div>


        </div>
    )
}

export default ProductCategory
