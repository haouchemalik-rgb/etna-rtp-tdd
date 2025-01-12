import request from 'supertest';
import express, { Application } from 'express';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import UserRouter from '../src/routes/users.route';
import SeminaryRouter from '../src/routes/seminary.route';
import TaskRouter from '../src/routes/task.route';
import { server } from '../src/server';

let app: Application;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use('/user', UserRouter);
  app.use('/seminary', SeminaryRouter);
  app.use('/task', TaskRouter);
});

describe('API Routes Integration Tests', () => {
  it('should return 200 for GET /user', async () => {
    const response = await request(app).get('/user');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should return 200 for GET /seminary', async () => {
    const response = await request(app).get('/seminary');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should return 200 for GET /task', async () => {
    const response = await request(app).get('/task');
    expect(response.status).toBe(200); 
    expect(response.body).toBeDefined();
  });
});
afterAll(() => {
  if (server) {
    server.close(() => {
      console.log('Server closed after tests');
    });
  }
});