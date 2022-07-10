import express from "express";
import {Request,Response} from 'express'
import { catchError } from "./error";
import { client } from "./server";
import { extractSingleFile, form } from "./uploadimage";
export const profileRoutes = express.Router()

profileRoutes.get('/userprofile',function(req:Request,res:Response){
    client.query(
        /*SQL*/
        `SELECT
         displayname
        ,weight
        ,height
        ,gender
        ,profilepic
        ,id
        FROM users
        WHERE id = $1`,[req.session.user?.id]

    )
    .then(result => {
        let info = result.rows
        res.json({info})
    })
    .catch(catchError(res))
})

profileRoutes.patch('/editProfile',function (req,res){
    console.log("HIIIII")

    form.parse(req,async (error,fields,files)=> {

        const displayName = fields.editDisplayname
        const weight = fields.editWeight
        const height = fields.editHeight
        let file = extractSingleFile(files.editImage)
        let image = file?.newFilename || null

        console.log(displayName,weight,height,image)

        if(!displayName){
            res.status(400).json({error:'Missing Display Name'})
            return
        }

        if(!weight){
            res.status(400).json({error:'Missing Weight'})
        }

        if(!height){
            res.status(400).json({error:'Missing Height'})
        }
    
        if (!image) {
            await client.query(
                'UPDATE users SET displayname =$1 ,weight = $2 ,height = $3 WHERE id = $4', [displayName, weight, height, req.session.user?.id]
            )

        } else await client.query(
            'UPDATE users SET displayname =$1 ,profilepic = $2 ,weight = $3 ,height = $4 WHERE id = $5', [displayName, image, weight, height, req.session.user?.id]
        )

        .then(()=>res.json({success:true}))
        .catch(catchError(error))

    })})
