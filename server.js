import express from 'express';
// import cors from 'cors';

const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors'

//db and authenticateuser
import connectDB from './db/connect.js';

// routers

import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobRoutes.js';


import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
// import authenticateUser from './middleware/auth.js';

//since we have to post request as json

// app.use(cors());
app.use(express.json());

console.log("hello");
console.log("hello");

app.get('/',(req,res)=>{
    res.json({msg:'welcome!'})
})

app.get('/api/v1',(req,res)=>{
    res.json({msg:'API'})
})

//middleware
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',jobsRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;



const start =async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`server is running on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()