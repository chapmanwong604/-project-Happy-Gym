import express,{Request,Response} from "express";
import { client } from "./server";
// import { catchError } from "./error";
import {checkPassword} from "./hash";
import { io } from "./io";

export const userLoginPageRoutes = express.Router();

userLoginPageRoutes.use(express.urlencoded({ extended: false }));
userLoginPageRoutes.use(express.json());

userLoginPageRoutes.post("/login",async(req:Request,res:Response) => {
    const username = req.body.username
    const password = req.body.password
    const users = await client.query(`SELECT * FROM users WHERE username = '${username}'`)
    if(users.rows.length == 0) {
        res.status(400).json({error:'Wrong username'})
        return
    }
    const user = users.rows[0];
    const match = await checkPassword(password,user.password);
    if(!match){
        res.status(400).json({error:'Wrong password'})
        return
    }
    req.session["user"] = {id:user.id,username:user.username};
    res.json({
            success: true
        });
    io.emit('LoginSuccess', 
        `${user.displayname} has logged in successfully`
    )
})  

