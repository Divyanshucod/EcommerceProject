import { AuthControllersignUp } from "../controllers/auth.controller.js"

// authentication route

export const authRoute = (app)=>{
    app.post('/ecommerce/api/v1/auth/signup',AuthControllersignUp);
}