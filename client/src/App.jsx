import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { useAppContext } from './contexts/AppContext.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductCategory from './components/ProductCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'


const App = () => {
    const {products} = useAppContext()

    const location = useLocation().pathname;

    return (
        <div>
            
                {!location.includes("seller") && !location.includes("login") && !location.includes("signup") && <Navbar />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/allproducts" element={<AllProducts />} />
                    {products && <Route path="/allproducts/:category" element={<ProductCategory />} />}
                    {products && <Route path="/allproducts/:category/:id" element={<ProductDetails/>} />}
                    <Route path="/mycart" element={<Cart />} />
                </Routes>
                {!location.includes("seller") && !location.includes("login") && !location.includes("signup") && <Footer />}
        </div>
    )
}

export default App
