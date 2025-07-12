const request = require('supertest');
const app = require('../app');

describe('Login', () => {
  it('Debería loguear al usuario con credenciales válidas', async () => {
    const res = await request(app).post('/api/users/login').send({
      emailOrAlias: 'Adm',
      password: '123456'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/login exitoso/i);
    expect(res.body).toHaveProperty('token');
  });
});
