import http from 'http'
import socketIO from 'socket.io';


export let io:socketIO.Server

export function attachServer (server: http.Server) {
    io = new socketIO.Server(server)
}