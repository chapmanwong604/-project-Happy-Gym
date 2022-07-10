import express,{Request,Response} from "express";
import { client } from "./server";

export const gymRoomRoutes = express.Router();

// gymRoomRoutes.use(express.urlencoded({ extended: false }));
// gymRoomRoutes.use(express.json());

gymRoomRoutes.get('/gymroom', async (req :Request, res:Response) => {
    const gymRooms = await client.query(`select * from gym_room order by id asc`)
    res.json(gymRooms.rows)
})