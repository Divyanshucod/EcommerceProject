import express from 'express'
import mongoose from 'mongoose'
import { server_configs } from './configs/server.config.js';
import { db_config } from './configs/db.config.js';
import { userModel } from './models/user.model.js';
import bcrypt from 'bcryptjs'
import { authRoute } from './routes/auth.route.js';
import { CategoryRoute } from './routes/category.routes.js';
const app = express();
//creating admin user only if not present

app.use(express.json())
// connection with db
 mongoose.connect(db_config.DB_URL);
 const db = mongoose.connection;

 //handling error
 db.on('error',()=>{
    console.log("Error while connecting to db!");
 }) 

 //sucessfull connection
 db.on('open',()=>{
    console.log("db connecttion established!");
    init();
 })
authRoute(app);
CategoryRoute(app);
app.listen(server_configs.PORT,()=>{
    console.log("server started at PORT No:",server_configs.PORT);
})

async function init(){
    try{
        let user = await userModel.findOne({userType:'ADMIN'});
        if(user){
            console.log("Admin is present");
            return;
        }
    }catch(err){
        console.log("Error while reading the data:",err);
    }
   
    try{
        user = await userModel.create({
            name:'Dev',
            userId:'admin',
            userType:'ADMIN',
            password:bcrypt.hashSync('clashroyale',8),
            email:'dev123@gmail.com'
        })
        console.log('admin created:',user);
        
    }catch(err){
        console.log(err);  
    }
   
}
