import express from 'express'

const app = express()
import dotenv from 'dotenv'
dotenv.config()


import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

app.get('/',(req,res)=>{
    throw new Error('error')
    res.send('welcome!')
})

//middleware

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is running on port ${port}...`)
})