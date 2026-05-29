/**
 * Jest Unit Tests for CompTrack Backend API
 * Covers all endpoints for high test coverage validation
 */

const request = require('supertest');
const app = require('./server');

describe('CompTrack Backend API Suite', () => {
  
  // Test health check endpoint
  test('GET /health should return 200 and UP status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'UP');
    expect(response.body).toHaveProperty('timestamp');
  });

  // Test features endpoint
  test('GET /api/features should return a list of competitor features', async () => {
    const response = await request(app).get('/api/features');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('name', 'AI Recommendations');
  });

  // Test successful login
  test('POST /api/login with valid credentials returns a JWT token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: 'password' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Test failed login
  test('POST /api/login with invalid credentials returns 401 error', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'wrong', password: 'user' });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error', 'Invalid credentials');
  });
});
