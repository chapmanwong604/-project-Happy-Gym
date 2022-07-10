import express from 'express';
import { Request, Response } from 'express';

import { client } from './server';
export const sportsLogRoutes = express.Router();




// GET (by whole database)
sportsLogRoutes.get('/sportslog', async (req: Request, res: Response) => {
    try {
        const id = req.session.user?.id;
        const result = await client.query(
            /* SQL */
            `SELECT id,timer,date_create,sports_type FROM sports_log WHERE deleted=1 AND user_id = $1`, [id]);

            const sportsLogs = result.rows;

            // console.log(sportsLogs);
            res.json(sportsLogs);

    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
})

// UPDATE
sportsLogRoutes.patch('/sportslog/:id', async (req: Request,res:Response) => {
    try {
        const id = req.params.id;        
        await client.query(
            /* SQL */
            `UPDATE sports_log SET deleted = 0 WHERE id = $1`, [id]);
        res.json({success: true});

    } catch (error) {
     console.log(error);
    }
})