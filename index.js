import express from 'express'
import { Server } from 'socket.io'

const PORT = 3500
const app = express()
const expressServer = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer, {
  cors: { origin: '*' }
})

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`)
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id} said ${message}`);
  });
})