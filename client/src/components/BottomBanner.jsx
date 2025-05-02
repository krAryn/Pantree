import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
    return (
        <div className='relative px-6 md:px-16 lg:px-32 mt-24'>
            <img src={assets.bottom_banner_image} alt="bottom banner image" className='w-full hidden md:block' />
            <img src={assets.bottom_banner_image_sm} alt="bottom banner image" className='w-full md:hidden' />

            <div className='absolute inset-0 flex flex-col max-w-[500px] max-h-[700px] items-start md:justify-center pt-16 md:pt-0 md:pr-24 left-[20%] md:left-[50%]'>
                <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-6'>Why We Are the Best?</h1>
                {features.map((feature, index) => {
                    return (<div key={index} className='flex items-center gap-4 mt-2'>
                        <img src={feature.icon} alt={feature.title} className='md:w-11 w-9' />
                        <div className="flex flex-col">
                        <h3 className='text-lg md:text-xl font-semibold'>{feature.title}</h3>
                        <p className='text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
                        </div>
                    </div>)
                })}
            </div>

        </div>
    )
}

export default BottomBanner
