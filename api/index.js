const express = require('express');
const uuid = require('uuid/v4');

const app = express();
app.use(express.json());

class Chat {
  constructor(groupId = null, lastMessageId = null, messages = [], persons = [], totalMessages = 0, totalPersons = 0) {
    this.groupId = groupId;
    this.lastMessageId = lastMessageId;
    this.messages = messages;
    this.persons = persons;
    this.totalMessages = totalMessages;
    this.totalPersons = totalPersons;
  }

  addMessage(message) {
    this.messages.push(message);
    this.totalMessages += 1;
    this.lastMessageId = message.id;
  }

  addPerson(person) {
    this.persons.push(person);
    this.totalPersons += 1;
    this.groupId = uuid();
  }

  getMessages(id) {
    if (this.lastMessageId === id) return [];
    const messageArray = [];
    let i = this.totalMessages - 1;
    while (!i < 0 && this.messages[i].id !== id) {
      const message = this.messages[i];
      messageArray.push(message);
      i -= 1;
    }
    return messageArray;
  }
}

class Person {
  constructor(id, name, active = true) {
    this.id = id;
    this.name = name;
    this.active = active;
  }
}

class Message {
  constructor(id, person, message) {
    this.id = id;
    this.person = person;
    this.message = message;
  }
}

const chat = new Chat(uuid());

app.post('/user/new', (req, res) => {
  try {
    const id = uuid();
    const { name } = req.body;
    const personObj = new Person(id, name);
    chat.addPerson(personObj);
    res.status(201).json({ chat });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

app.post('/message/new', (req, res) => {
  try {
    const id = uuid();
    const { person, message } = req.body;
    const messageObj = new Message(id, person, message);
    chat.addMessage(messageObj);
    res.status(201).json({ chat });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

module.exports = app;
