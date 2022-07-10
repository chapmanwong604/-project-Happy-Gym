import expressSession from 'express-session'
import express from 'express'
import dotenv from 'dotenv'

export const SessionRoutes = express.Router();

dotenv.config();


// Add this line
SessionRoutes.use(
  expressSession({
    secret: "SECRET",
    resave: true,
    saveUninitialized: true,
  }),
)

declare module 'express-session' {
  interface SessionData {
    user?:{
        id:number
        username:string
    }
  }
}