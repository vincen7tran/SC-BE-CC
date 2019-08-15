const request = require('supertest');
const app = require('../server/index');

describe('Get Energy Information by ID Tests', () => {
  it ('It properly fetches energy data for Vehicle ID 1234',
    () => request(app)
      .get('/vehicles/1234/fuel')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const { percent } = body;

        expect(percent).toBeDefined();
        expect(typeof percent).toBe('number');
      }));
  
  it ('It properly fetches energy data for Vehicle ID 1235',
    () => request(app)
      .get('/vehicles/1235/battery')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const { percent } = body;

        expect(percent).toBeDefined();
        expect(typeof percent).toBe('number');
      }));
  
  it ('It properly handles wrong fuel type for Vehicle ID 1234. Fuel Vehicle to Battery Endpoint.',
    () => request(app)
      .get('/vehicles/1234/battery')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty('error');
      }));

  it ('It properly handle wrong fuel type for Vehicle ID 1235. Electric Vehicle to Fuel Endpoint.',
    () => request(app)
      .get('/vehicles/1235/fuel')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty('error');
      }));

  it ('It handles a Bad ID for Fuel EP',
    () => request(app)
      .get('/vehicles/1234123/fuel')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(({ body }) => {
        expect(body).toHaveProperty('error');
      }));

  it ('It handles a Bad ID for Battery EP',
    () => request(app)
      .get('/vehicles/1234123/battery')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(({ body }) => {
        expect(body).toHaveProperty('error');
      }));
});