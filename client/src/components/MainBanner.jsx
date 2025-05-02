import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router'

const MainBanner = () => {
    return (
        <div className='relative px-6 md:px-16 lg:px-32 mt-10'>
            <img src={assets.main_banner_bg} alt="main banner" className='w-full hidden md:block ' />
            <img src={assets.main_banner_bg_sm} alt="main banner" className='w-full md:hidden' />
            <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-30 lg:pl-60">
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-[1.25] lg:leading-14'>Freshness You Can Trust, Savings You Will Love! </h1>

                <div className='flex items-center mt-6 font-medium'>
                    <Link to="/allProducts" className="group flex items-baseline gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull tranistion rounded text-white cursor-pointer">
                        Shop Now
                        <img src={assets.white_arrow_icon} alt="arrow" className="transition group-focus:translate-x-1 md:hidden" />
                    </Link>
                    <Link to="/allProducts" className="group hidden md:flex items-baseline gap-2 px-9 py-3 cursor-pointer">
                        Explore Deals
                        <img src={assets.black_arrow_icon} alt="arrow" className='transition group-hover:translate-x-1' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainBanner
