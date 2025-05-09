import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { dummyAddress, dummyOrders } from '../assets/assets'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

const AppContext = createContext()
const useAppContext = () => {
    return useContext(AppContext)
}

const MAX_PER_ITEM_LIMIT = 5;

const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState()      // user stores user id or null if user isn't logged in 
    const [isSeller, setIsSeller] = useState()     // if the user is Seller then isSeller is true.
    const navigate = useNavigate()
    const location = useLocation();
    const [products, setProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState()
    const [addresses, setAddresses] = useState(dummyAddress)
    const [currentAddress, setCurrentAddress] = useState(addresses[0])
    const [myOrders, setMyOrders] = useState(dummyOrders)
    const [cartItems, setCartItems] = useState({})

    const fetchProducts = async () => {
        // console.log("Products are fetched")

        try {
            const {data} = await axios.get("/api/product/list")
            if (data.success) {
                // console.log(data.products)
                setProducts(data.products.filter(product => product.inStock));       // get inStock products 
            } else {
                toast.error("Database error!")
                console.log("Database error")
                // return Promise.reject()
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
            // return Promise.reject()
        }
    }

    const fetchSeller = async () => {
        try {
            const {data} = await axios.get("/api/seller/is-auth")
            setIsSeller(data.success)
        } catch (error) {
            console.log(error.message)
        }
    }

    const fetchUser = async () => {
        try {
            const {data} = await axios.post("/api/user/is-auth", {})
            if (data.success) {
                // console.log("User Data: ", data)
                setUser(data.currentUser)
                setCartItems(data.currentUser.cartItems)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSeller()
        fetchUser()
    }, [])


    const getTotalCartItems = () => {
        let total = 0;
        for (let i of Object.values(cartItems)) {
            total += i;
        }

        return total;
    }

    const getTotalCartAmount = () => {
        let total = 0;
        for(let item in cartItems) {
            total += cartItems[item] * products.find(product => product._id === item).offerPrice
        }
        return Math.floor(total);
    }

    useEffect(() => {

        if (user) {
            (async () => {
                try {
                    const {data} = await axios.post("/api/cart/update", {cartItems})
                    if (!data.success) {
                        toast.error(data.message)
                    }
                } catch (error) {
                    toast.error(error.message)
                }
            })()
        }

    }, [cartItems])

    const addToCart = (itemId) => {
        
        if (cartItems[itemId] === MAX_PER_ITEM_LIMIT) {
            toast.error(`Maximum ${MAX_PER_ITEM_LIMIT} units per item is allowed at one time`, {duration: 1500})
        } else {
            let newCartData = {...cartItems};
            if(newCartData[itemId]) {
                newCartData[itemId] += 1
            } else {
                newCartData[itemId] = 1;
            }
            setCartItems(newCartData);
            toast.success("Added to your Cart!", {duration: 1000})
        }
        
    }

    console.log("Cart Items: ", cartItems)

    const removeFromCart = (itemId) => {
        let newCartData = {...cartItems};
        if (newCartData[itemId]) {
            if (newCartData[itemId] === 1) {
                newCartData[itemId] = undefined;
            } else {
                newCartData[itemId] -= 1;
            }
        }
        setCartItems(newCartData);
        toast.success("Removed from your Cart!", {duration: 1000})
    }

    const updateCartItems = (itemId, no) => {
        let newCartData = {...cartItems};

        if (no === undefined) {
            delete newCartData[itemId];
        } else {
            newCartData[itemId] = no;
        }
        setCartItems(newCartData);
        toast.success("Cart Updated!", {duration: 1000})
    }

    const value = {user, setUser, isSeller, setIsSeller, navigate, location, products, setProducts, addToCart, removeFromCart, cartItems, searchQuery, setSearchQuery, getTotalCartItems, getTotalCartAmount, updateCartItems, addresses, setAddresses, currentAddress, setCurrentAddress, myOrders, setMyOrders, axios, fetchProducts}

    useEffect(() => {
        fetchProducts()
            let filteredProducts = []
            if (searchQuery) {
                filteredProducts = Array.from(products).filter((product) => String(product.name).toLowerCase().includes(searchQuery.toLowerCase()))
            } else {
                filteredProducts = [...products]
            }

            console.log("search query changed")

            setProducts(filteredProducts)
    }, [searchQuery])

    useEffect(() => {
        // fetch addresses and set state;
        
    }, [addresses])

    useEffect(() => {
        // set current address and put it at index 0 in addresses 
    }, [currentAddress])

    return (
        <AppContext.Provider value={value}>
            <Toaster />
            {children}
        </AppContext.Provider>
    )
}


export { AppContextProvider, useAppContext }
