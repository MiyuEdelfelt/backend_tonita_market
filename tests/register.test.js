const request = require('supertest');
const app = require('../app');

describe('Registro', () => {
    it('Debería registrar un nuevo usuario', async () => {
        const res = await request(app).post('/api/users/register').send({
            name: 'Juan',
            lastName: 'Pérez',
            alias: 'juanito_test',
            email: `juan${Date.now()}@test.com`,
            password: '123456'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/usuario creado/i);
    });
});
