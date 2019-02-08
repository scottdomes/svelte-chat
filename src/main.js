import io from 'socket.io-client';

import App from './App.html';
const socket = io('http://localhost:3000');

const app = new App({
  target: document.body,
  data: {
    messages: [],
    newMessage: ''
  }
});

app.on('submitForm', () => {
  socket.emit('newMessage', app.get().newMessage);
});

socket.on('messages', messages => {
  app.set({
    messages
  });
});

window.app = app;

export default app;
