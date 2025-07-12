const request = require('supertest');
const app = require('../app');

describe('Publicaciones', () => {
    it('Debería obtener todas las publicaciones', async () => {
        const res = await request(app).get('/api/publications');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.publications)).toBe(true); 
    });
});
