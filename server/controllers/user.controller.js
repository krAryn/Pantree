import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from jsonwebtoken;

// Path: /api/user/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name || email || password) {
            return res.json({ success: false, message: "Missing details!" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: "User Already Exists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, password: hashedPassword, email })
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, { 
            httpOnly: true,              // Prevents browser js in clinet to access or modify it
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.json({success: true, message: "User Registration Complete"})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}