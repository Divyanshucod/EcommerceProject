// check request body is proper and correct.

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