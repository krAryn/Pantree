import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { dummyProducts, dummyAddress, dummyOrders } from '../assets/assets'
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

    const [user, setUser] = useState(true)      // user stores user id or null if user isn't logged in 
    const [isSeller, setIsSeller] = useState(true)     // if the user is Seller then isSeller is true.
    const navigate = useNavigate()
    const location = useLocation();
    const [products, setProducts] = useState()
    const [searchQuery, setSearchQuery] = useState()
    const [addresses, setAddresses] = useState(dummyAddress)
    const [currentAddress, setCurrentAddress] = useState(addresses[0])
    const [myOrders, setMyOrders] = useState(dummyOrders)

    const fetchProducts = async () => {
        return Promise.resolve(dummyProducts.filter(product => product.inStock));       // get inStock products 
    }

    const [cartItems, setCartItems] = useState({})

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
    }

    const value = {user, setUser, isSeller, setIsSeller, navigate, location, products, setProducts, addToCart, removeFromCart, cartItems, searchQuery, setSearchQuery, getTotalCartItems, getTotalCartAmount, updateCartItems, addresses, setAddresses, currentAddress, setCurrentAddress, myOrders, setMyOrders, axios}


    useEffect(() => {
        fetchProducts().then(productsList => {
            let filteredProducts = [];
            // if searchQuery is set then filer out the searchQuery from products array and assign it to filteredProduct else directly assign products array to filteredProducts

            if (searchQuery) {
                filteredProducts = Array.from(productsList).filter((product) => String(product.name).toLowerCase().includes(searchQuery.toLowerCase()))
            } else {
                filteredProducts = [...productsList]
            }

            setProducts(filteredProducts)
        })
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
