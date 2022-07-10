import express from 'express'
import {Request,Response} from 'express'
import {print} from 'listening-on'
import { loginRoutes } from './register';
import { Client } from 'pg'
import dotenv from 'dotenv'
import { SessionRoutes } from './session';
import { profileRoutes } from './profile';
import { inputManualRoutes } from './inputmanual';  // Chapman committed part
import { sportsLogRoutes } from './sportslog';      // Chapman committed part
import {userLoginPageRoutes} from './login';
import { chartRoutes } from './chart';
import { gymRoomRoutes } from './gymroom';
import { homePageRoutes} from './homepage'
import { youTubeRoutes } from './youtube';
import { userGuard} from './guard';
import http from 'http';
import { attachServer, io } from './io';
import { createEventsRoutes } from './createevent'; // Chapman committed part
import { eventListRoutes } from './eventlist';
import path from "path";



// -------------Connect to DB -----------------
dotenv.config();

export const client = new Client({
    database:process.env.DB_NAME,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD
})

client.connect()



// Server setup

const app = express();



app.get('/', function(req:Request,res:Response){
    res.redirect('/login.html')
})

export let server = new http.Server(app);
attachServer(server)

const PORT =2000

server.listen (PORT,()=>{
    print(PORT)
})

io.on('connection',socket=>{
    console.log("Socket Io connection:",socket.id)
}) 

//-------------Connect to Routes
app.use(SessionRoutes)
app.use(loginRoutes)
app.use(profileRoutes)
app.use(inputManualRoutes)  // Chapman committed part
app.use(sportsLogRoutes)    // Chapman committed part
app.use(userLoginPageRoutes)
app.use(gymRoomRoutes)
app.use(homePageRoutes)
app.use(youTubeRoutes)
app.use(createEventsRoutes) // Chapman committed part
app.use(eventListRoutes)
app.use(express.static('public'))
app.use(userGuard, express.static('user')) 
// app.use( express.static('user'))
app.use(path.resolve('/uploads'), express.static(path.resolve('uploads')))
app.use(chartRoutes)


app.use((req, res) => {
    res.sendFile(path.resolve('./user/404.html'))
  })