// const connectionString = 'mongodb+srv://abhiscience:<password>@abhinavcluster.b2daqtw.mongodb.net/abhiKart?retryWrites=true&w=majority'
import mongoose from "mongoose";

const connectDB = (url)=>{
    return mongoose.connect(url)
}

export default connectDB