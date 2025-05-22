import mongoose from "mongoose";

const dbConnection = async ()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log("MongoDB connection error: ", err);
    });
}

export default dbConnection;