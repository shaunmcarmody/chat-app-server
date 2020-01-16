const express = require('express');
const cors = require('cors');
const uuid = require('uuid/v4');

const server = express();
server.use(cors());
server.use(express.json());

class Chat {
  constructor(messages = []) {
    this.messages = messages;
  }

  addMessage(message) {
    this.messages.push(message);
  }

  getMessages(totalClientMsgs) {
    const messages = [];
    const totalMsgs = this.messages.length;
    const difference = totalMsgs - totalClientMsgs;

    if (!difference) return messages;

    for (let i = totalClientMsgs; i < totalMsgs; i += 1) {
      const msg = this.messages[i];
      messages.push(msg);
    }
    return messages;
  }
}

class Message {
  constructor(user, message, id = uuid()) {
    this.user = user;
    this.message = message;
    this.id = id;
  }
}

const chat = new Chat();

server.post('/subscribe/', async (req, res) => {
  try {
    const { totalMsgs } = req.body;
    const messages = chat.getMessages(totalMsgs);
    res.status(200).json({ messages });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

server.post('/message/new', (req, res) => {
  try {
    const { user, message } = req.body;
    const messageObj = new Message(user, message);
    chat.addMessage(messageObj);
    res.status(201).json({ message: 'success' });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
server.listen(port, () => console.log(`\n** Server running on port ${port} **\n`));
