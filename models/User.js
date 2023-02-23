import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import  Jwt  from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please provide your name' ],
        minlength:3,
        maxlength:20,
        trim:true
    },

    email:{
        type: String,
        required: [true, 'please provide your email' ],
        validate:{
            validator:validator.isEmail,
            message: 'Please provide a valid email' 
        },
        unique:true
    },

    password:{
        type: String,
        required: [true, 'please provide your password' ],
        minlength:6,
        Selection:false
    },

    lastname:{
        type: String,
        maxlength:20,
        trim:true,
        default:"indian"
    },

    location:{
        type: String,
        maxlength:20,
        trim:true,
        default:"my city"
    }

})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

UserSchema.methods.createJWT = function(){
    return Jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

export default mongoose.model('User',UserSchema)