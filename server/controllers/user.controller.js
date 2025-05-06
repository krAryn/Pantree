import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Path: /api/user/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            console.log(name, " ", email, " ", password, " ")
            return await res.json({ success: false, message: "Missing details!" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return await res.json({ success: false, message: "User Already Exists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, password: hashedPassword, email })
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, { 
            httpOnly: true,              // Prevents browser js in clinet to access or modify it
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/user"
        })

        return await res.json({success: true, message: "User Registration Complete", user: {name, email, password}})

    } catch (error) {
        console.log(error.message)
        return awaitres.json({success: false, message: error.message})
    }
}

// Path: /api/user/login
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return await res.json({success: false, message: "Email address and password are required!"})
        }

        const existingUser = await User.findOne({email})

        if (!existingUser) {
            return await res.json({success: false, message: "User not found!"})
        }

        const passwordMatched = await bcrypt.compare(password, existingUser.password)

        if (!passwordMatched) {
            return await res.json({success: false, message: "Invalid Credentials!"})
        }

        const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/user/"
        })

        return await res.json({success: true, message: "User is Valid "})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

// Path: /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const {userId} = req.body
        const user = await User.findById(userId)

        if (!user) {
            return res.json({success: false, message: "User not authenticated!"})
        }

        return res.json({success: true, message: "Authenticated", user: {id: user._id, name: user.name, email: user.email}})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}

// Path: /api/user/logout
export const logout = async (req, res) => {
    const {token} = req.cookies;

    if (!token) {
        return res.json({succcess: true, message: "Already Logged Out!"})
    }

    try {
        res.clearCookie("token", {httpOnly: true, path: "/api/user/"})
        return res.json({success: true, message: "Logged Out"})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}