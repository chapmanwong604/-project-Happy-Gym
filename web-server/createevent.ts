import express from 'express';
import {Request, Response } from 'express';
import {client} from './server';
export const  createEventsRoutes = express.Router();
import {io} from './io'

createEventsRoutes.use(express.urlencoded());
createEventsRoutes.use(express.json());

// Event Create Form:

createEventsRoutes.post('/newevent', async (req:  Request, res: Response) => {
    try {
        const eventName = req.body.createeventname;
        const eventDate = req.body.createdate;
        const eventTime = req.body.createtime;
        const eventLimit = req.body.createlimit;
        const eventLocation = req.body.createlocation;
        const user_id = req.session.user?.id;
        
        const event = await client.query(
            /* SQL */
            `INSERT INTO events (event_name, event_date, event_time, event_max, event_location, create_user_id) VALUES ($1, $2, $3, $4, $5, $6) returning id`
            , [eventName, eventDate, eventTime, eventLimit, eventLocation, user_id]);
        
        res.json({eventName, eventDate, eventTime, eventLimit, eventLocation,user_id,id:event.rows[0].id, success:true});
        io.emit('newEventCreated',{"event_name":eventName,"event_date":eventDate,"event_time":eventTime, "event_max":eventLimit, "event_location":eventLocation, id:event.rows[0].id})

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})




// Enrolled Events:

createEventsRoutes.get('/event', async (req: Request, res: Response) => {
    try {
        const id = req.session.user?.id;

        const result = await client.query(
            /* SQL */
            `SELECT * 
            from events 
            left outer join 
            (select event_id, user_id from attendance_list Group by event_id, user_id) as count_table 
            on events.id = count_table.event_id where user_id = ${id} order by event_date asc;`);
        const eventList = result.rows;
        res.json(eventList);
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})