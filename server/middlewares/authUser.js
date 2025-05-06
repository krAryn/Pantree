// Middleware for protected paths
import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {

    try {
        const {token} = req.cookies
    
        if (!token) {
            return res.json({success: false, message: "Token not defined!"})
        }
    
        const user = jwt.verify(token, process.env.JWT_SECRET)
    
        if (!user) {
            return res.json({success: false, message: "Token verification failed!"})
        }
    
        req.body.userId = user.userId
        next()
    } catch (error) {
        console.log(error.message)
        return await res.json({success: false, message: error.message})
    }

}

export default authUser