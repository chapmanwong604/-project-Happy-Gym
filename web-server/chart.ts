import express from "express";
import {Request,Response} from 'express'
import { catchError } from "./error";
import { client } from "./server";
export const chartRoutes = express.Router()

chartRoutes.get('/Chart',function(req:Request,res:Response){
    client.query(
        "SELECT date_trunc('week',date_create::date) AS weekly, SUM (timer) FROM sports_log WHERE date_create>now() - interval'1'year AND user_id = $1 AND deleted = 1 GROUP BY weekly ORDER BY weekly;",[req.session.user?.id]
    )
    .then(result => {
        res.json(result.rows)
    })
    .catch(catchError(res))
})


chartRoutes.get('/typeChart', function(req,res) {
    client.query(
        'SELECT sports_type, SUM (timer) FROM sports_log WHERE user_id = $1 AND deleted = 1 GROUP BY sports_type',[req.session.user?.id]
    )
    .then(result => {
        res.json(result.rows)
    })
    .catch(catchError(res))
})