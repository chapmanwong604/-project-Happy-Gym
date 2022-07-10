import express from 'express'
import {Request,Response} from 'express'
import { catchError } from './error';
import { hashPassword } from './hash';
import { client } from './server';
import { extractSingleFile, form } from './uploadimage';
export const loginRoutes = express.Router();



loginRoutes.post('/register',function(req:Request,res:Response){

    
   form.parse(req,(error,fields,files)=> {

    // console.log("ABC:",files.abc)

    const username = fields.username
    const password = fields.password
    const displayName = fields.displayname
    const weight = fields.weight
    const height = fields.height
    const gender = fields.gender
    let file = extractSingleFile(files.image)
    let image = file?.newFilename || null

    
//   console.log("*********FILES",files,"TYPE OF FILES",typeof files,"FILE:",file,"IMAGE:",image)

   if (!username){
       res.status(400).json({error:'Missing username'})
       return
   }
   if (!password){
       res.status(400).json({error:"Missing password"})
       return
   }
   if (!displayName){
       res.status(400).json({error:"Missing display name"})
       return
   }

   if (!weight){
    res.status(400).json({error:"Missing weight"})
    return
}
    if (!height){
        res.status(400).json({error:"Missing height"})
        return
    }
    if (!gender){
        res.status(400).json({error:"Missing gender"})
        return
    }

//    console.log(typeof username, typeof password)
   
   if (typeof password !== 'string' || typeof username !== 'string'){
    //    console.log("HERE ERROR")
       res.json(String(error))
       return
   }
   
   if (image == null){
       image="No_Image.jpeg"
   }

    hashPassword(password)
    .then(hash_password => 
        client.query(
        'INSERT INTO users (username,password,displayname,weight,height,gender,profilepic) VALUES ($1,$2,$3,$4,$5,$6,$7) returning id'
        ,[username,hash_password,displayName,weight,height,gender,image]))
    .then(result => {
        let id = result.rows[0].id
        req.session.user ={
            id,
            username,
        }
        res.json({id})
        
    })
    .catch(error => {
        if (String(error).includes('unique')){
            throw 'This username is already in use'
        }
        throw error
    })
    
    .catch(catchError(res))   
   


   })

});