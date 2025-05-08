import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/db.config.js"
import userRouter from "./routes/user.route.js"
import sellerRouter from "./routes/seller.route.js"
import connectCloudinary from "./config/cloudinary.config.js"
import productRoute from "./routes/product.route.js"
import cartRouter from "./routes/cart.route.js"

const app = express()
const PORT = process.env.PORT || 4000

await connectDB()
connectCloudinary()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get("/", (req, res) => {
    return res.send("API IS RUNNING, SUCCESSFULLY!")
})

app.use("/api/user", userRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/product", productRoute)
app.use("/api/cart", cartRouter)

app.post("/", (req, res) => {
    console.log("Data: ", req.body, "\n Cookies: ", req.cookies)
    res.send("data received!")
})

app.listen(PORT, () => {
    console.log("Server is running on Port: ", PORT)
})