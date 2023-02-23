import User from "../models/User.js";
import {StatusCodes} from 'http-status-codes';

import BadRequestError from "../errors/bad-request.js";





const register = async (req,res)=>{

    const {name,email,password}=(req.body);

    if(!name || !email || !password){
        throw new BadRequestError('Please provide all values')
    }

    const UserAlreadyExist = await User.findOne({email})
    if(UserAlreadyExist){
        throw new BadRequestError('Email ready in use');
    }

        const user = await User.create({name,email,password});
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({user :{
            email:user.email,
            lastname:user.lastname,
            location:user.location,
            name:user.name
        },
        token,
        location:user.location});

}

const login = async (req,res)=>{
    res.send('login user');
}

const updateUser = async (req,res)=>{
    res.send('Update user');
}

export  {register,login,updateUser}