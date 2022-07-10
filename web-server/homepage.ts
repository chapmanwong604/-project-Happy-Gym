import express from 'express';
import {Request,Response} from 'express'
import {client} from "./server";
import { catchError } from './error';

export const homePageRoutes = express.Router();

homePageRoutes.get("/userprofile" , async (req:Request, res:Response) => {
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


    homePageRoutes.get("/usertotalhour" , async (req:Request, res:Response) => {
      client.query(
          /*SQL*/
          `SELECT
          SUM (timer) as totalhours
          FROM sports_log
          WHERE user_id = $1 and deleted = 1` ,[req.session.user?.id]
  
      )
      .then(result => {
          let info = result.rows
          res.json({info})
      })
      .catch(catchError(res))
  })



homePageRoutes.post("/logout",(req,res) => {
    req.session.destroy(error => {
        if (error) {
          console.error('failed to destroy session:', error)
        }
        res.json({success: true})
      })
    })
