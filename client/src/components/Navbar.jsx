import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router'
import { useAppContext } from '../contexts/AppContext.jsx'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, setUser, navigate, setSearchQuery, getTotalCartItems, axios } = useAppContext()

    const totalCartItems = getTotalCartItems();


    const logout = async () => {

        try {
            const {data} = await axios.get("/api/user/logout")
            if (data.success) {
                toast.success(data.message)
                setOpen(false)
                setUser(null)
                // navigate(0)
                navigate("/home")
            } else {
                toast.error(data.message)
            }
        } catch(error) {
            toast.error(error.message)
        }

    }

    const myOrdersMobile = () => {
        if (user) {
            setOpen(false)
        } else {
            navigate("/login")
        }
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <Link to="/"><img className="h-13" src={assets.logo} alt="Logo" /></Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                {/* <button className='border px-[10px]' onClick={() => setSearchQuery(searchQuery + 1)}>change search query {searchQuery}</button> */}
                <div className="transition-[all] duration-300 hidden md:flex items-center text-sm gap-2 border border-gray-300 px-[12px] rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" onClick={() => navigate("/allproducts")} onChange={(e) => setSearchQuery(e.currentTarget.value)} />
                    <img src={assets.search_icon} alt="search" />
                </div>
                <Link to="home">Home</Link>
                <Link to="allproducts">All Products</Link>
                <Link to="contact">Contact</Link>


                <div className="cart relative cursor-pointer" onClick={() => navigate("/myCart")}>
                    <img src={assets.cart_icon} alt="cart" className="w-[15px] min-w-[15px]" />
                    {totalCartItems ? <button className="cursor-pointer absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{totalCartItems}</button> : ""}
                </div>

                {user ? (
                    <div className="relative group">
                        <img src={assets.profile_icon} className="w-10" alt="profile" />
                        <ul className="h-0 p-0 group-hover:block group-hover:opacity-100 group-hover:py-2.5  group-hover:border group-hover:shadow  group-hover:h-[80px] absolute top-10 right-0 bg-white border-gray-200  w-30 rounded-md text-sm z-40 transition-height duration-300 overflow-hidden">
                            <Link to="myorders"><li className="font-poppins px-4 py-1 hover:bg-gray-200">My Orders</li></Link>
                            <li className="font-poppins px-4 py-1 hover:bg-gray-200 cursor-pointer" onClick={logout}>Log Out</li>
                        </ul>
                    </div>
                ) : (
                    <button onClick={() => navigate("login")} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>
                )}


            </div>


            {/* Mobile Menu */}

            <div className='sm:hidden flex gap-6'>
                <div className="cart relative cursor-pointer" onClick={() => navigate("/myCart")}>
                    <img src={assets.cart_icon} alt="cart" className="w-[15px] min-w-[15px]" />
                    {totalCartItems ? <button className="cursor-pointer absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{totalCartItems}</button> : ""}
                </div>
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden cursor-pointer">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="menu" />
            </button>
            </div>

            <div className={`${open ? `h-[200px] py-4` : 'h-0 p-0'} absolute top-[80px] left-0 w-full bg-white shadow-md flex-col items-start gap-2 text-sm md:hidden overflow-hidden flex px-5 transition-all duration-300 z-10`}>

                <Link to="home" onClick={() => setOpen(false)} className="block">Home</Link>
                <Link to="allproducts" onClick={() => setOpen(false)} className="block">All Products</Link>
                <Link to="myorders" onClick={myOrdersMobile}>My Orders</Link>
                <Link to="contact" onClick={() => setOpen(false)} className="block">Contact</Link>

                {
                    user ? (
                        <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => {
                            setOpen(false)
                            navigate("/login")
                        }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>
                    )
                }


            </div>



        </nav>
    )
}

export default Navbar
