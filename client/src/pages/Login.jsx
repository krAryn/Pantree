import React from 'react'
import { useForm } from "react-hook-form"
import toast, { Toaster } from 'react-hot-toast'
import { assets } from '../assets/assets'
import { Link } from 'react-router'
import { useAppContext } from '../contexts/AppContext'


const Login = () => {
    const {setUser, navigate, axios} = useAppContext(); 

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (userData) => {
        if (!String(userData.email).includes("@")) {
            toast.error("Please enter a valid Email address", {duration: 1000})
        } else {

            try {
                const {data} = await axios.post("/api/user/login", {email: userData.email, password: userData.password})
                if (data.success) {
                    setUser(data.currentUser)
                    navigate(0)
                    navigate("/")
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }
    
    const validate = () => {
        if (errors.email) toast.error(errors.email.message, {duration: 1000})
        else if (errors.password) toast.error(errors.password.message, {duration: 1000})
    }

    return (
        <div className="flex h-[100%] w-full">

            <div className="w-full hidden lg:inline-block">
                <img className="h-full object-cover" src={assets.login_register_banner} alt="leftSideImage" />
            </div>

            <div className="w-full lg:hidden">
                <img className="w-full min-w-[752px] object-cover" src={assets.login_register_banner_sm} alt="leftSideImage" />
            </div>

            <div className="w-full flex flex-col items-center justify-center p-10 absolute lg:relative">

                <form onSubmit={handleSubmit(onSubmit)} className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
                    <p className="text-sm text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p>

                    <button type="button" className="cursor-pointer hover:bg-gray-500/15 w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full">
                        <img src={assets.google_logo} alt="googleLogo" />
                    </button>

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
                        </svg>
                        <input placeholder="Email id" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" 
                            {...register("email", { required: {value: true, message: "Email address is Required"} })} 
                            />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
                        </svg>
                        <input type="password" placeholder="Password" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" 
                            {...register("password", { 
                                required: {value: true, message: "Password address is Required"},
                            })}
                        />
                    </div>

                    <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                        <div className="flex items-center gap-2">
                            <input className="h-5" type="checkbox" id="checkbox" />
                            <label className="text-sm" for="checkbox">Remember me</label>
                        </div>
                        <a className="text-sm underline" href="#">Forgot password?</a>
                    </div>

                    {!isSubmitting? (
                        <input type="submit" value="Sign In" className="mt-8 w-full h-11 rounded-full text-white bg-primary hover:bg-primary-dull transition-opacity cursor-pointer" onClick={validate} />
                    ): (
                        <button className="mt-8 w-full h-11 rounded-full text-gray-500 bg-gray-500/20 transition-opacity" disabled>Submitting</button>
                    )}
                        
                    <p className="text-gray-500/90 text-sm mt-4">Don’t have an account? <Link className="text-primary hover:underline" to="/signup">Sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login