// check request body is proper and correct.
import jwt from "jsonwebtoken"
import { JwtSecCod } from "../configs/auth.config.js"
import { userModel } from "../models/user.model.js"
export const VerifySignUpBody = async (req,res,next)=>{
     try{
          if(!req.body.name){
            res.status(400).send({
                message:"Failed! Name is required"
            })
          }
          if(!req.body.email){
            res.status(400).send({
                message:"Failed! Email is required"
            })
          }
          if(!req.body.userId){
            res.status(400).send({
                message:"Failed! userId is required"
            })
          }
          const user = await userModel.findOne({userId:req.body.userId});
          if(user){
             res.status(400).send({
                message:"user with same userId already present"
             })
          }

          next();
     }catch(err){
        console.log("Error while verifying the signup body!");
        res.status(500).send({
            message:"Error in verification "+err
        })
     }
}
export const VerifySignInBody = async (req,res,next)=>{
     if(!req.body.userId){
        return res.status(400).send({
            message:"Userid required"
        })
     }
     if(!req.body.password){
        return res.status(400).send({
            message:"password required"
        })
     }

     next();
}
export const VerifyToken = (req,res,next)=>{
    // check token present 

    const token = req.headers["access_token"];
    console.log(token);
    
    if(!token){
      return res.status(403).send({
        message:"Unauthorized Access"
      })
    }
    // check it is valid 
    jwt.verify(token,JwtSecCod.secret),async (err,decoded)=>{
      if(err){
        return res.status(401).send({
          message:"unauthorized access"
        })
      }
      const user = await userModel.findOne({userId:decoded.id})
      if(!user){
        return res.status(400).send({
          message:"unauthorized the user for this token is not exist"
        })
      }
      req.user = user;
      next();
    };
    // move next
}
export const isAdmin = (req,res,next)=>{
   const user = req.user;
    if(user && req.body.userType == 'ADMIN'){
        next();
    }
    else{
      return res.status(403).send({
        message:"only ADMIN user can access this"
      })
    }
}