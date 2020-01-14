const express = require('express');

const app = express();

class Chat {
  constructor(participants = [], messages = [], lastMessage = null) {
    this.participants = participants;
    this.messages = messages;
    this.lastMessage = lastMessage;
  }
}

class Message {
  constructor(id, person, message) {
    this.id = id;
    this.person = person;
    this.message = message;
  }
}

class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const chat = new Chat();

module.exports = app;
