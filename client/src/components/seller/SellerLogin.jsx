import { useAppContext } from '../../contexts/AppContext'
import { useForm } from "react-hook-form"

const SellerLogin = () => {

    const { isSeller } = useAppContext()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const submitData = async () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                console.log("Successfully Logged In!")
                res()
            }, 2000)
        })
    }

    const submitHandler = async (data) => {
        if (!String(data.email).includes("@")) {
            console.log("Enter valid email address")
        } else {
            console.log(data)
            await submitData()
        }
    }

    const validate = () => {
        if (Object.keys(errors).length > 0) {
            console.log(errors[Object.keys(errors)[0]].message)
        }
    }

    return !isSeller && (
        <div>
            <form onSubmit={handleSubmit(submitHandler)} className='min-h-screen flex items-center text-sm text-gray-600'>

                <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                    <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller </span>Login</p>
                    <div className="w-full">
                        <p>Email</p>
                        <input
                            type="text"
                            placeholder='Enter your Email'
                            className='w-full px-3 py-2 border border-gray-300 rounded outline-primary'
                            {...register("email", {required: "Email is required!"})}
                        />
                    </div>
                    <div className="w-full">

                        <p>Password</p>
                        <input
                            type="password"
                            placeholder='Enter your Password'
                            className='w-full px-3 py-2 border border-gray-300 rounded outline-primary'
                            {...register("password", {required: "Password is required!"})}
                        />
                    </div>
                    {!isSubmitting ? (<input value="Log In" onClick={validate} type="submit" className='text-white bg-primary cursor-pointer hover:bg-primary-dull transition w-full py-2 rounded-md' />): (<button type="button" className='text-gray-500 bg-gray-500/20 w-full py-2 rounded-md' disabled>Please Wait</button>)}
                </div>

            </form>
        </div>
    )
}

export default SellerLogin
