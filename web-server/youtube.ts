import express from 'express';
import { Request, Response } from 'express';
import { client } from './server';
export const youTubeRoutes = express.Router();

youTubeRoutes.get('/youtubevideo/:sportstype', async (req: Request, res: Response) => {
    const sportsType = req.params.sportstype;

    try {
        const result = await client.query(
            /* SQL */
            `SELECT video_link from youtube WHERE sports_type = $1`, [sportsType]
        )

        const youTubeVideo = result.rows;
        res.json(youTubeVideo);

    } catch (error) {
        console.log(error);
    }
})

youTubeRoutes.post('/autorecordtime/:time/autorecordtype/:sportstype', async (req: Request, res: Response) => {
    const timer = req.params.time;
    const sportsType = req.params.sportstype;
    const id = req.session.user?.id;

    try {
        await client.query(
            /* SQL */
            `INSERT INTO sports_log(timer,date_create, sports_type, user_id, deleted) VALUES ($1, current_timestamp, $2, $3, 1) returning (date_create)`
            , [timer, sportsType, id])

        res.json({ success: true });

    } catch (error) {
        console.log(error);
    }

})
