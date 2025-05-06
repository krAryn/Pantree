import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/db.js"


await connectDB()

const app = express()
const PORT = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.send("API IS RUNNING, SUCCESSFULLY!")
})

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.post("/", (req, res) => {
    console.log("Data: ", req.body, "\n Cookies: ", req.cookies)
    res.send("data received!")
})

app.listen(PORT, () => {
    console.log("Server is running on Port: ", PORT)
})