const server = require('./server.js');
const request = require('supertest');

describe('testing environment', () => {
  test('sanity check', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });
});
