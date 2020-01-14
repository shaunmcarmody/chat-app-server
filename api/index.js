const express = require('express');
const uuid = require('uuid/v4');

const app = express();
app.use(express.json());

class Chat {
  constructor(
    participants = 0,
    persons = [],
    messages = [],
    totalMessages = 0,
    lastMessage = null,
  ) {
    this.participants = participants;
    this.persons = persons;
    this.messages = messages;
    this.totalMessages = totalMessages;
    this.lastMessage = lastMessage;
  }

  addMessage(message) {
    this.messages.push(message);
    this.totalMessages += 1;
    this.lastMessage = message.id;
  }

  addPerson(person) {
    this.persons.push(person);
    this.participants += 1;
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

const chat = new Chat();

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
