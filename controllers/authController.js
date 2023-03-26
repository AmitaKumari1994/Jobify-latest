import User from "../models/User.js";
import {StatusCodes} from 'http-status-codes';
import {BadRequestError,UnAuthenticatedError} from "../errors/index.js";






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
        res.status(StatusCodes.CREATED).json({user :{
            email:user.email,
            lastname:user.lastname,
            location:user.location,
            name:user.name
        },
        token,
        location:user.location});

}

const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide all values');
    }

    const user = await User.findOne({email}).select('+password')
    if(!user){
        throw new UnAuthenticatedError('Invalid credentials')
    }
    console.log(user);

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid credentials');
    }
    
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({user , token , location: user.location});

}

const updateUser = async (req,res)=>{

    const {email,name,lastname,location} = req.body;
    if(!email || !name || !lastname || !location){
        throw new BadRequestError('Please provide all values');
    }
    const user = await User.findOne({_id:req.user.userId})

    user.email = email;
    user.name = name;
    user.lastname = lastname;
    user.location = location;

    await user.save()

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user,token,location: user.location})



    console.log(req.user)
    res.send('Update user')
}

export  {register,login,updateUser}