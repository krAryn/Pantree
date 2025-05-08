import express from "express"
import authUser from "../middlewares/user.auth.js"
import { getAllOrders, getUserOrder, placeOrderCOD } from "../controllers/order.controller.js"
import authSeller from "../middlewares/seller.auth.js"

const orderRouter = express.Router()

orderRouter.post("/cod", authUser, placeOrderCOD)
orderRouter.get("/user", authUser, getUserOrder)
orderRouter.get("/seller", authSeller, getAllOrders)

export default orderRouter