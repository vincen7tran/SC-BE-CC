const request = require('supertest');
const app = require('../server/index');

// Tests check specific endpoints for appropriate status codes, content-type, and response format
// Tests also check valid and invalid inputs

describe('Test Suite: Get General Vehicle Information by ID', () => {
  it ('It properly fetches vehicle data for Vehicle ID 1234',
    () => request(app)
      .get('/vehicles/1234')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const { vin, color, doorCount, driveTrain } = body;

        expect(vin).toBe('123123412412');
        expect(color).toBe('Metallic Silver');
        expect(doorCount).toBe(4),
        expect(typeof doorCount).toBe('number');
        expect(driveTrain).toBe('v8');
      }));
  
  it ('It properly fetches vehicle data for Vehicle ID 1235',
    () => request(app)
      .get('/vehicles/1235')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const { vin, color, doorCount, driveTrain } = body;

        expect(vin).toBe('1235AZ91XP');
        expect(color).toBe('Forest Green');
        expect(doorCount).toBe(2),
        expect(typeof doorCount).toBe('number');
        expect(driveTrain).toBe('electric');
      }));

  it ('It handles a Bad ID',
    () => request(app)
      .get('/vehicles/1234123')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(({ body }) => {
        expect(body).toHaveProperty('error');
      }));
});