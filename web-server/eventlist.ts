
import express from 'express';
import{ Request , Response } from 'express';
import {client} from './server'
export const eventListRoutes = express.Router();

eventListRoutes.get("/eventlist", async (req :Request, res:Response) => {
    try{
        // const userid = req.session.user?.id;
        const result = await client.query(
            /* SQL */
            `SELECT * 
            from events 
            left outer join 
            (select event_id,COUNT(*) as no_of_participants from attendance_list Group by event_id) as count_table 
            on events.id = count_table.event_id Where (CURRENT_DATE < event_date or (CURRENT_DATE = event_date AND NOW()::time < event_time))order by event_date asc, event_time asc;`);
            const eventList = result.rows; 
            res.json(eventList);
    }catch (error) {
        console.log(error);
        res.json({success: false});
    }
})

eventListRoutes.post("/attendancelist",async (req :Request, res:Response) => {
    try{
        const userId = req.session.user?.id;
        const eventId = req.body.event_id;

        client.query(
            `SELECT user_id from attendance_list where event_id = $1 AND user_id = $2`,[eventId,userId]
        ).then(result=> {
                if (result.rows.length >0){
                    res.json({error:"You have enrolled in this event already!"})
                    return -1;
                }
                return 0;
            }
        ).then((action:any)=>{
            if (action === 0){
            return client.query(
                /* SQL */
                `SELECT * 
                from events 
                left outer join 
                (select event_id,COUNT(*) as no_of_participants from attendance_list Group by event_id) as count_table 
                on events.id = count_table.event_id where event_id =$1`,[eventId])
               
            }
            return action;
    
        }).then((result:any) => {
            if (result != -1) {
                if (result.rows[0]){
                    if (result.rows[0].event_max < result.rows[0].no_of_participants){
                        res.json({ error: "Full" });
                        return -1;
                }
              }
              return client.query(
                   /* SQL */
                  `INSERT INTO attendance_list (user_id,event_id) VALUES ($1,$2)`,[userId,eventId]
              );
            }
            return result;
        }
    ).then(result => {
        if (result != -1) {
            res.json({success:true})
        }
    })

       

    }catch (error) {
        console.log(error);
        res.json({success: false});
    }
})

