import jwt from "jsonwebtoken"

const authSeller = async (req, res, next) => {
    const {sellerToken} = req.cookies;

    try {
        if (!sellerToken) {
            return res.json({success: false, message: "Seller Token not found!"})
        }
    
        const seller = jwt.verify(sellerToken, process.env.JWT_SECRET)
    
        if (!seller) {
            return res.json({success: false, message: "Seller token verification failed"})
        }
    
        if (seller.email !== process.env.SELLER_EMAIL) {
            return res.json({success: false, message: "Seller Email is not valid!"})
        } else {
            next()
        }
    } catch (error) {
        console.log(error)  
        return res.json({success: false, message: error.message})
    }
}

export default authSeller