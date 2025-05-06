import express from "express";
import { isAuth, loginUser, registerUser, logout } from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/is-auth", authUser, isAuth)
userRouter.get("/logout", logout)

export default userRouter;