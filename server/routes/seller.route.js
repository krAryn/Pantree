import express from "express"
import { sellerIsAuth, sellerLogin, sellerLogout } from "../controllers/seller.controller"
import authSeller from "../middlewares/authSeller"

const sellerRouter = express.Router()

sellerRouter.post("/login", sellerLogin)
sellerRouter.get("/is-auth", authSeller, sellerIsAuth)
sellerRouter.get("/logout", sellerLogout)

export default sellerRouter