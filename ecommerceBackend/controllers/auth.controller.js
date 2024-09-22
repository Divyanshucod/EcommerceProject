// login and registering user(controller)
import bcrypt from 'bcryptjs'
import { userModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import { JwtSecCod } from '../configs/auth.config.js';
export const AuthControllersignUp = async(req,res)=>{
    // Registering the user.
    const request_body = req.body;

   
    const userObj = {
        name:request_body.name,
        email:request_body.email,
        password: bcrypt.hashSync(request_body.password,8),
        userId:request_body.userId
    }

    try{
       const createdUser = await userModel.create(userObj);
       console.log(createdUser);

       res.status(201).json({message:"user created successfully"})
       
    }catch(err){
        console.log("Error while registering the user",err);
        res.status(500).json({
            message:"some error happens while registering the user!"
        })
    }
}

export const AuthControllersignIn = async (req,res)=>{
       //login the user
       const request_body = req.body;
       try{
        const user = await userModel.findOne({
            userId:request_body.userId,
           })
        
        if(!user){
           return res.status(400).send({
            message:"UserId not exist"
           })
        }
        const isPasswordMatched = bcrypt.compareSync(request_body.password,user.password);
        if(!isPasswordMatched){
          return res.status(401).send({
            message:"Password incorrect"
          })
        }
        
    const token = jwt.sign({id:request_body.userId},JwtSecCod.secret,{
        expiresIn:120
    })
        res.status(200).send({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            accessToken:token
        })

       }catch(err){
            res.status(500).send({
                message:"Error while signin"
            })
       }
}