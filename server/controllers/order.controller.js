// Path: /api/order/cod

import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const placeOrderCOD = async (req, res) => {
    try {
        const {userId, items, address} = req.body;
        const [DELIVERY_CHARGE, HANDLING_CHARGE] = [25, 2]

        if (!address || items.length === 0) {
            return res.json({success: false, message: "Invalid Data!"})
        }

        let amount = DELIVERY_CHARGE + HANDLING_CHARGE;
        for (let item of items) {
            const product = await Product.findById(item.product)
            amount += item.quantity * product.offerPrice
        }

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentTyep: "COD",
        })

        return res.json({success: true, message: "Order Placed"})
    } catch (error) {
        console.log(error.message)
        return res.json({success: "false", message: error.message})
    }
}

// Get order by user id: /api/order/user
export const getUserOrder = async (req, res) => {
    try {
        const {userId} = req.body
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1})
        return res.json({success: true, message: "Order Fetched Successfully", orders})
    } catch (error) {
        console.log(error.message)
        return res.json({success: true, message: error.message})
    }
}

// Get all orders for admin: /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1})
        return res.json({success: true, message: "Order Fetched Successfully", orders})
    } catch (error) {
        console.log(error.message)
        return res.json({success: true, message: error.message})
    }
}