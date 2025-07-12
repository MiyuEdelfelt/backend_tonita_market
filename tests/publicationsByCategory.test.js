const request = require('supertest');
const app = require('../app');

describe('Publicaciones por Categoría', () => {
  it('Debería listar publicaciones de una categoría específica', async () => {
    const categoryId = 1; 
    const res = await request(app).get(`/api/publications/by-category/${categoryId}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.publications)).toBe(true);
  });
});
