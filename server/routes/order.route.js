import express from "express"
import authUser from "../middlewares/user.auth.js"
import { getAllOrders, getUserOrder, placeOrderCOD } from "../controllers/order.controller.js"
import authSeller from "../middlewares/seller.auth.js"

const orderRouter = express.Router()

orderRouter.post("/cod", authUser, placeOrderCOD)
orderRouter.post("/user", authUser, getUserOrder)
orderRouter.post("/seller", authSeller, getAllOrders)

export default orderRouter