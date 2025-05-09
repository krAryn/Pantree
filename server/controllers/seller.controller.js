import jwt from "jsonwebtoken"

// Path: /api/seller/login
export const sellerLogin = async (req, res) => {

    try {
        const {email, password} = req.body
    
        if (!email || !password) {
            return await res.json({success: false, message: "Email and password are required!"})
        }
    
        if (email !== process.env.SELLER_EMAIL || password !==  process.env.SELLER_PASSWORD) {
            return await res.json({success: false, message: "Invalid Credentials!"})
        }

        const sellerToken = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.cookie("sellerToken", sellerToken, {
            httpOnly: true, 
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/"
        })
        return res.json({success: true, message: "Seller is Valid"})

    } catch (error) {
        console.log(error)
        return await res.json({success: false, message: error.message})
    }

}

// Path: /api/seller/is-Auth

export const sellerIsAuth = async (req, res) => {
    try {
        return await res.json({success: true, message: "Seller is Authenticated"})
    } catch (error) {
        console.log(error.message)
        return await res.json({success: false, message: error.message})
    }
}

// Path: /api/seller/logout

export const sellerLogout = async (req, res) => {
    const {sellerToken} = req.cookies;

    if (!sellerToken) {
        return res.json({succcess: true, message: "Already Logged Out!"})
    }

    try {
        res.clearCookie("sellerToken", {httpOnly: true, path: "/api/"})
        return res.json({success: true, message: "Logged Out"})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}