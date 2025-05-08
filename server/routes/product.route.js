import express from "express"
import { addProduct, changeStock, productById, productList } from "../controllers/products.controller.js"
import upload from "../config/multer.config.js"
import authSeller from "../middlewares/seller.auth.js"

const productRoute = express.Router()

productRoute.post("/add", authSeller,upload.array("images", 2), addProduct)
productRoute.get("/list", productList)
productRoute.post("/id", productById)
productRoute.post("/stock", changeStock)

export default productRoute