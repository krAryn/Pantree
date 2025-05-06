import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("Successfully connect to PantreeDB!")
    } catch (error) {
        console.log(error.message)
    }

}

export default connectDB