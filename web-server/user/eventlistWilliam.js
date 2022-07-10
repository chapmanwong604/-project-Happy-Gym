let socket = io.connect()



socket.on('new-update',update => {
    console.log('socket.io received new update',update)
})

socket.on('connect',() => {
    console.log('socket.io connected to server',socket.id)
})