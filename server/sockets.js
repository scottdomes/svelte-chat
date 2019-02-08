import socket from 'socket.io';

const emitMessages = async (db, emitter) => {
  const messages = await getMessages(db);
  emitter.emit('messages', messages);
};

const getMessages = db => {
  return db
    .collection('messages')
    .find()
    .toArray();
};

const handleNewMessage = (db, client, io) => {
  client.on('newMessage', async message => {
    await db.collection('messages').insertOne({ text: message });
    emitMessages(db, io);
  });
};

const setUpConnection = (io, db) => {
  io.on('connection', async client => {
    emitMessages(db, client);
    handleNewMessage(db, client, io);
  });
};

export default (server, db) => {
  const io = socket(server);
  setUpConnection(io, db);
};
