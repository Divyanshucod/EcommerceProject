// login and registering user(controller)
import bcrypt from 'bcryptjs'
import { userModel } from '../models/user.model.js';
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