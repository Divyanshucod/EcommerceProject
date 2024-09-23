import { categoryModel } from "../models/category.model.js";

export const createCategory = async(req,res)=>{
       const request_body = req.body;
       const categoryData = {
        name:request_body.name,
        description:request_body.description
       }
       try{
        const category = await categoryModel.create(categoryData);
        return res.status(200).send({
            message:"category created!",
            category:category
        })
       }catch(err){
        console.log("Error while creating category ",err);
        return res.status(500).send({
            message:'Error while creating category'
        })
       }
}