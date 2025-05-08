import {useState} from 'react'
import {useForm} from "react-hook-form"
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {

    const [imageFiles, setImageFiles] = useState([])

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
    } = useForm()

    // const submitData = async () => {
    //     return new Promise((res) => {
    //         setTimeout(() => {
    //             console.log("Product Added!")
    //             res()
    //         }, 2000)
    //     })
    // }

    const {axios, navigate, products, fetchProducts} = useAppContext()

    const submitHandler = async (dataFromForm) => {
        try {
            const productData = {
                name: dataFromForm.name,
                category: dataFromForm.category,
                price: dataFromForm.price,
                offerPrice: dataFromForm.offerPrice,
                description: dataFromForm.description.split("\n"),
            }
            // console.log(productData)
            const formData = new FormData()
    
            formData.append("productData", JSON.stringify(productData))
    
            for (let imageFile of imageFiles) {
                formData.append("images", imageFile)
            }
    
            const {data} = await axios.post("/api/product/add", formData)
    
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                // navigate("/seller")
                reset()
                setImageFiles([])
                fetchProducts()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    const validate = () => {
        if (Object.keys(errors).length > 0) {
            console.log(errors[Object.keys(errors)[0]].message)
        }
    }

    return (
        <div className="no-scrollbar py-10 flex flex-col justify-between bg-white h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit(submitHandler)} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input 
                                    type="file" 
                                    id={`image${index}`} 
                                    hidden
                                    onChange={(e) => {
                                        const imageFilesTemp = [...imageFiles]
                                        imageFilesTemp[index] = e.currentTarget.files[0]
                                        setImageFiles(imageFilesTemp)
                                    }}
                                />
                                <img className="max-w-24 cursor-pointer" src={imageFiles[index] ? URL.createObjectURL(imageFiles[index]): assets.upload_area} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input 
                        id="product-name" 
                        type="text" 
                        placeholder="Type here" 
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        {...register("name", {required: "Please Enter a product Name!"})}
                        />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea 
                        id="product-description" 
                        rows={4} 
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" 
                        placeholder="Type here"
                        {...register("description", {required: "Please Enter a product Description!"})}
                        >
                    </textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select 
                        id="category" 
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        {...register("category", {required: "Please Select a product category!"})}
                        >
                        <option value="" disabled selected>Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.text}</option>
                        ) )}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input 
                            id="product-price" 
                            type="number" 
                            placeholder="0" 
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            {...register("price", {required: "Please Enter Product Price!"})}
                            />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input 
                            id="offer-price" 
                            type="number" 
                            placeholder="0" 
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" 
                            {...register("offerPrice", {required: "Please Enter Offer Price!"})}
                        />
                    </div>
                </div>
                {!isSubmitting ?(<button onClick={validate} className="px-8 py-2.5 bg-primary cursor-pointer hover:bg-primary-dull transition text-white font-medium rounded">ADD</button>): (
                    <button onClick={validate} className="px-8 py-2.5 text-gray-500 bg-gray-500/20 cursor-pointer font-medium rounded" disabled>ADD</button>
                )}
            </form>
        </div>
    );
};

export default AddProduct
