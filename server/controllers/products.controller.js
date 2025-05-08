import Product from "../models/product.model.js"
import { v2 as cloudinary } from "cloudinary"

// Add product: /api/product/add
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData)
        const images = req.files;

        console.log(typeof productData)

        const imagesUrl = []

        for (let image of images) {
            const result = await cloudinary.uploader.upload(image.path, {resource_type: "auto"}).catch(err => {
                console.log(err)
            })
            imagesUrl.push(result.secure_url)
        }

        console.log(imagesUrl)

        console.log("ProductData: ", productData)
        console.log("ImagesUrl: ", imagesUrl)

        await Product.create({...productData, image: imagesUrl})

        return res.json({success: true, message: "Product Successfully Added!"})

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Get All products: /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Get single product by id: /api/product/id
export const productById = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await Product.findById(productId)
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Toggle stock of product: /api/product/stock
export const changeStock = async (req, res) => {
    
    try {
        const { id, inStock } = req.body

        const product = await Product.findByIdAndUpdate(id, {inStock})
        console.log("Stock after: ", product)
        res.json({success: true, message: "Stock Updated", product})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}