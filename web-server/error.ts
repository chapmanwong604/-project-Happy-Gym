import express from 'express'

export function catchError(res: express.Response) {
  return (error: any) => res.status(500).json({ error: String(error) })
}
