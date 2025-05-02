import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../contexts/AppContext'

const Categories = () => {

    const { navigate } = useAppContext();

    return (
        <div className='px-6 md:px-16 lg:px-32 mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Categories</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">

                {
                    categories.map((item, index) => {
                        return (
                            <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center' style={{ backgroundColor: item.bgColor }} onClick={() => {
                                // scrollTo(0, 0)
                                navigate(`/allproducts/${item.path.toLowerCase()}`)
                            }
                            }>
                                <img src={item.image} alt="" className='group-hover:scale-108 transition max-w-28' />
                                <p className='text-sm font-medium'>{item.text}</p>
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Categories
