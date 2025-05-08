import express from "express"
import { addAddress, getAddress } from "../controllers/address.controller.js"
import authUser from "../middlewares/user.auth.js"

const addressRouter = express.Router()

addressRouter.post("/add", authUser, addAddress)
addressRouter.post("/get", authUser, getAddress)

export default addressRouter