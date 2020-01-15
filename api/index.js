const express = require('express');
const uuid = require('uuid/v4');
const isBefore = require('date-fns/isBefore');

const app = express();
app.use(express.json());

class Chat {
  constructor(messages = [], messagesLastUpdated = null, persons = [], personsLastUpdated = null, totalMessages = 0, totalPersons = 0) {
    this.messages = messages;
    this.messagesLastUpdated = messagesLastUpdated;
    this.persons = persons;
    this.personsLastUpdated = personsLastUpdated;
    this.totalMessages = totalMessages;
    this.totalPersons = totalPersons;
  }

  addMessage(message) {
    this.messages.push(message);
    this.totalMessages += 1;
    this.messagesLastUpdated = message.published;
  }

  addPerson(person) {
    this.persons.push(person);
    this.totalPersons += 1;
    this.personsLastUpdated = new Date();
  }

  getMessages(date) {
    if (isBefore(date, this.messagesLastUpdated)) {
      return {
        messages: this.messages,
        messagesLastUpdated: this.messagesLastUpdated,
        totalMessages: this.totalMessages,
      };
    }
    return [];
  }

  getPersons(date) {
    if (isBefore(date, this.personsLastUpdated)) {
      return {
        persons: this.persons,
        personsLastUpdated: this.personsLastUpdated,
        personstotalPersons: this.totalPersons,
      };
    }
    return [];
  }
}

class Person {
  constructor(name, id = uuid(), active = false, created = new Date()) {
    this.name = name;
    this.id = id;
    this.active = active;
    this.created = created;
  }
}

class Message {
  constructor(person, message, id = uuid(), published = new Date()) {
    this.person = person;
    this.message = message;
    this.id = id;
    this.published = published;
  }
}

const chat = new Chat();

app.post('/user/new', (req, res) => {
  try {
    const { name } = req.body;
    const personObj = new Person(name);
    chat.addPerson(personObj);
    res.status(201).json({ payload: chat });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

app.post('/query', (req, res) => {
  try {
    const { messagesLastUpdated, personsLastUpdated } = req.body;
    const payload = {
      ...chat.getMessages(new Date(messagesLastUpdated)),
      ...chat.getPersons(new Date(personsLastUpdated)),
    };
    res.status(201).json({ payload });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

app.post('/message/new', (req, res) => {
  try {
    const { person, message } = req.body;
    const messageObj = new Message(person, message);
    chat.addMessage(messageObj);
    res.status(201).json({ payload: chat });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

module.exports = app;
