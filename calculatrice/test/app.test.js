const request = require('supertest');
const app = require('../app');

test('GET /add/1/2 should return 3', async () => {
    const response = await request(app).get('/add/1/2');
    expect(response.body.result).toBe(3);
});

test('GET /subtract/5/2 should return 3', async () => {
    const response = await request(app).get('/subtract/5/2');  // Correction ici
    expect(response.body.result).toBe(3);
});

test('GET /multiply/3/2 should return 6', async () => {
    const response = await request(app).get('/multiply/3/2');
    expect(response.body.result).toBe(6);
});

test('GET /divide/6/2 should return 3', async () => {
    const response = await request(app).get('/divide/6/2');
    expect(response.body.result).toBe(3);
});

test('GET /divide/6/0 should return an error', async () => {
    const response = await request(app).get('/divide/6/0');
    expect(response.body.error).toBe('Cannot divide by zero');
});

