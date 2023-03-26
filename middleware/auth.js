import {UnAuthenticatedError} from "../errors/index.js";
import jwt from 'jsonwebtoken'

UnAuthenticatedError
const auth = async (req,res,next)=>{
     const headers = req.headers;
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnAuthenticatedError("Authentication Invalid")
    }

const token = authHeader.split(' ')[1]

try {
    
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(payload)
    // console.log(headers);
    // console.log(authHeader);
    // console.log("authenticate user");
    req.user = {userId: payload.userId}
    next() //passing to next middleware

} catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
}
    
}

export default auth;