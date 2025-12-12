import { io } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const socket = io(API_URL, {
  autoConnect: false,
});

export default socket;
