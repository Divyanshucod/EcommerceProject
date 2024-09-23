import { createCategory } from "../controllers/category.controller.js";
import { isAdmin, VerifyToken } from "../middleware/Auth.mw.js";

export const CategoryRoute = (app)=>{
    app.post("/ecommerce/api/v1/category/create_categories",VerifyToken,isAdmin,createCategory);
}