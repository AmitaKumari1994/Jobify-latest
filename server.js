import express from 'express';
// import cors from 'cors';

const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors'
import morgan from 'morgan'

import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path'

//secure the server

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

//db and authenticateuser
import connectDB from './db/connect.js';

// routers

import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobRoutes.js';


import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import authenticateUser from './middleware/auth.js';

//since we have to post request as json

// app.use(cors());
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}

//set directory for deployment
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./client/build')))

app.use(express.json());
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())



app.get('/',(req,res)=>{
    res.json({msg:'welcome!'})
})

app.get('/api/v1',(req,res)=>{
    res.json({msg:'API'})
})

//middleware
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authenticateUser,jobsRouter);

//handle the request coming in prod after checking authentication

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./client/build','index.html'))
})


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