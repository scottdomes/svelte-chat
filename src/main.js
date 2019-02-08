import io from 'socket.io-client';

import App from './App.html';
const socket = io('http://localhost:3000');

const app = new App({
  target: document.getElementById('root'),
  data: {
    messages: [],
    newMessage: '',
    username: 'Scott2'
  }
});

app.on('submitForm', () => {
  const { newMessage, username } = app.get();
  socket.emit('newMessage', {
    text: newMessage,
    author: username
  });
  app.set({ newMessage: '' });
});

app.on('setUsername', () => {
  app.set({ username: document.getElementById('enter-username').value });
});

socket.on('messages', messages => {
  app.set({
    messages
  });
});

window.app = app;

export default app;
