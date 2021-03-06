const server = require('./server.js');
const request = require('supertest');

describe('testing environment', () => {
  test('sanity check', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });
});

describe('REGISTER USER: POST: /api/auth/register', () => {
  it('should return 200, and contain token', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'username', password: 'password' })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  it('should return 401 to avoid duplicate user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'username', password: 'mysecret' })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(401);
  });
});

describe('LOGIN USER: POST: /api/auth/login', () => {
  it('should return 200 and contain token', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'username', password: 'password' })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  it('should return 401 on incorrect password', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'username', password: 'nothatone' })
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(401);
    expect(res.body.token).toBeUndefined();
  });
});

describe('ADD JOURNAL ENTRY: POST: /api/journals', () => {
  it('should return 200 and contain username', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ username: 'username', password: 'password' })
      .set('Content-Type', 'application/json');
      
      const res = await request(server)
      .post('/api/journals')
      .send({
        numFishCaught: 4,
        date: 'Jan 9th, 2020',
        timeOfDay: 'Morning',
        location: 'Hickory Creek',
        bankOrBoat: 'bank',
        waterType: 'freshwater'
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', login.body.token);

    expect(res.status).toBe(200);
    expect(res.body.username).toBeTruthy();
  });
});
