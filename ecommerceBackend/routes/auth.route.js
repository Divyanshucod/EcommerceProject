import { AuthControllersignIn, AuthControllersignUp } from "../controllers/auth.controller.js"
import { VerifySignInBody, VerifySignUpBody } from "../middleware/Auth.mw.js";

// authentication route

export const authRoute = (app)=>{
    app.post('/ecommerce/api/v1/auth/signup',VerifySignUpBody,AuthControllersignUp);
    app.post('/ecommerce/api/v1/auth/signin',VerifySignInBody,AuthControllersignIn)
}