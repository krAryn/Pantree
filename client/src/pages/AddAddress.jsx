import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import toast, { Toaster } from 'react-hot-toast'
import {useForm} from "react-hook-form"
import { useAppContext } from '../contexts/AppContext'

const AddAddress = () => {
    const {addresses, setAddresses} = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();
    
    const validate = () => {
        let keys = Object.keys(errors)
        if (keys.length > 0) {
            toast.error(errors[keys[0]].message, {duration: 1000})
        }
    }

    const saveAddress = async () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                console.log("Address Saved")
                res()
            }, 2000)
        })
    }

    const submitHandler = async (data) => {
        if (!String(data.email).includes("@")) {
            toast.error("Please enter a valid Email address!", {duration: 1000})
        } else {
            // console.log(data)
            setAddresses([...addresses, data])
            await saveAddress()
            // console.log(addresses)
        }
    }

    useEffect(() => console.log(addresses), [addresses])
    

    return (
        <div className='mt-16 pb-16 px-6 md:px-16 lg:px-32'>
            <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center mt-10 gap-3">
                <div className='flex-1 lg:max-w-md lg:min-w-[400px] md:min-w-[500px]'>
                    <form onSubmit={handleSubmit(submitHandler)} className='space-y-3 mt-6 text-sm flex flex-col'>
                        <div className='flex gap-4'>
                            <input 
                                type="text" 
                                placeholder='First Name' 
                                className='w-full border border-gray-300 bg-white px-3 py-2 outline-primary rounded'
                                {...register("firstName", {required: "First Name is Required!"})} 
                            />
                            <input 
                                type="text" 
                                placeholder='Last Name' 
                                className='w-full border border-gray-300 bg-white px-3 py-2 outline-primary rounded'
                                {...register("lastName", {required: "Last Name is Required!"})} 
                            />
                        </div>
                        <input 
                            type="text" 
                            placeholder='Email Address' 
                            className='w-full border border-gray-300 bg-white px-3 py-2 outline-primary rounded'
                            {...register("email", {required: "Email is Required!"})}
                            />
                        <input 
                            type="text" 
                            placeholder='Street' 
                            className='w-full border border-gray-300 bg-white px-3 py-2 outline-primary rounded'
                            {...register("street", {required: "Street Name is Required!"})} 
                        />
                        <div className='flex gap-4'>
                            <input 
                                type="text" 
                                placeholder='City' 
                                className='w-full border border-gray-300 bg-white px-3 py-2 outline-primary rounded'
                                {...register("city", {required: "City Name is Required!"})} 
                            />
                            <input 
                                type="text" 
                                placeholder='State' 
                                className='w-full border border-gray-300 bg-white px-3 py-2 outline-primary rounded'
                                {...register("state", {required: "State Name is Required!"})} 
                            />
                        </div>
                        <div className='flex gap-4'>
                            <input 
                                type="text" 
                                placeholder='Zip Code' 
                                className='w-full border border-gray-300 bg-white px-3 py-2 outline-primary rounded'
                                {...register("zipcode", {required: "Zip Code is Required!"})} 
                            />
                            <input 
                                type="text" 
                                placeholder='Country' 
                                className='w-full border border-gray-300 bg-white px-3 py-2 outline-primary rounded'
                                {...register("country", {required: "Country is Required!"})} 
                            />
                        </div>
                        <input 
                            type="text" 
                            placeholder='Phone' 
                            className='w-full border border-gray-300 bg-white px-3 py-2 outline-primary rounded'
                            {...register("phone", {required: "Phone no. is Required!"})} 
                        />

                        {!isSubmitting ? (<button onClick={validate} className="w-full bg-primary hover:bg-primary-dull text-white font-medium py-2 px-4 rounded transition">Add Address</button>): (
                            <button onClick={validate} className="w-full text-gray-500 bg-gray-500/20 font-medium py-2 px-4 rounded transition" disabled>Saving Address</button>
                        )}
                    </form>
                </div>
                <img className='md:mr-16 mb-16 md:mt-0 lg:w-[414px] w-[300px]' src={assets.add_address_iamge} alt="" />
            </div>
        </div>
    )
}

export default AddAddress
