import { io } from 'socket.io-client';

socket = io('http://localhost:3000/');

module.exports = socket;
