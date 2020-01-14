const request = require('supertest');
const api = require('./index');

describe('/user/new', () => {
  it('should respond with 201 and return JSON', async () => {
    const res = await request(api).post('/user/new').send({ name: 'John Doe' });
    expect(res.status).toBe(201);
    expect(res.type).toBe('application/json');
    expect(res.body.chat.participants).toEqual(1);
  });
});

describe('/message/new', () => {
  it('should respond with 201 and return JSON', async () => {
    const res = await request(api).post('/message/new').send({ message: 'Hello world' });
    expect(res.status).toBe(201);
    expect(res.type).toBe('application/json');
    expect(res.body.chat.totalMessages).toEqual(1);
  });
});
