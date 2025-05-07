import express from "express"
import { addProduct } from "../controllers/products.controller.js"
import upload from "../config/multer.config.js"

const productRoute = express.Router()

productRoute.post("/add", upload.array("images", 2), addProduct)

export default productRoute