import io from 'socket.io-client';
import { socketURL } from './../config'
let socket 
export const startSocket = (token) => {
  socket = io(`${socketURL}?token=${token}`)
  return socket;
}

