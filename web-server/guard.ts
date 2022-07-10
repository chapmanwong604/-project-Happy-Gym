import { Request, Response, NextFunction } from 'express'
import './session'

export let userGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.user) {
    next()
  } else {
    res.redirect('/login.html')
    
      // .status(401)
      // .json({ error: 'This resources is only accessible by Happy Gym member' })
      
  }
}
