import Address from "../models/address.model.js";

// Path: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const {userId, address} = req.body;
        await Address.create({...address, userId})
        return res.json({success: true, message: "Address Added Successfully."})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }

}

// Path: /api/address/get
export const getAddress = async (req, res) => {
    try {
        const {userId} = req.body
        const addresses = await Address.find({userId})
        return res.json({success: true, message: "Addresses fetched successfully", addresses})
    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}