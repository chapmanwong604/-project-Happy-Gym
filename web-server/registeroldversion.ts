// import express from 'express'
// import {Request,Response} from 'express'
// import { catchError } from './error';
// import { hashPassword } from './hash';
// import { client } from './server';

// export const loginRoutes = express.Router();

// loginRoutes.use(express.urlencoded({extended:false}))

// loginRoutes.post('/register',function(req:Request,res:Response){

//    let {username,password} = req.body
//    console.log("TEST")
//    if (!username){
//        res.status(400).json({error:'Missing Username'})
//        return
//    }
//    if (!password){
//        res.status(400).json({error:"Missing Password"})
//        return
//    }
   
//    hashPassword(password)
//     .then(hash_password => 
//         client.query(
//         'INSERT INTO login_user (username,password) VALUES ($1,$2) returning id',[username,hash_password]))
//     .then(result => {
//         let id = result.rows[0].id
//         req.session.user ={
//             id,
//             username,
//         }
//         res.json({id})
//     })
//     .catch(error => {
//         if (String(error).includes('unique')){
//             throw 'This username is already in use'
//         }
//         throw error
//     })
//     .catch(catchError(res))   
// });