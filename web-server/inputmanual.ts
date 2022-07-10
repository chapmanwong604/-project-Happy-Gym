import express from 'express';
import { Request, Response } from 'express';
import { client } from './server';
import { catchError } from './error';
export const inputManualRoutes = express.Router();


inputManualRoutes.use(express.urlencoded());
inputManualRoutes.use(express.json());

inputManualRoutes.post('/recordsports', (req: Request, res: Response) => {
    const timer = req.body.timer;
    const sportsType = req.body.sportstype;
    const id = req.session.user?.id;

    client.query(
        /* SQL */
        `INSERT INTO sports_log (timer, date_create, sports_type, user_id, deleted) VALUES ($1, current_timestamp, $2, $3, 1) returning (date_create)`
        , [timer, sportsType, id])
        .then((result) => {
            let date = result.rows[0].date_create;
            res.json({ timer, date, sportsType });
        })
        .catch(catchError(res));
})
