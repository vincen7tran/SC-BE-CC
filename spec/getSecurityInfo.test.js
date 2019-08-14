const request = require('supertest');
const app = require('../server/index');

describe('Get Security Information by ID Tests', () => {
  it ('It properly fetches security data for Vehicle ID 1234',
    () => request(app)
      .get('/vehicles/1234/doors')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        for (let door of body) {
          const { location, locked } = door;

          if (location === 'frontRight') expect(typeof locked).toBe('boolean');
          if (location === 'frontLeft') expect(typeof locked).toBe('boolean');
          if (location === 'backLeft') expect(typeof locked).toBe('boolean');
          if (location === 'backRight') expect(typeof locked).toBe('boolean');
        }

        expect(body.length).toBe(4);
      }));
  
  it ('It properly fetches security data for Vehicle ID 1235',
    () => request(app)
      .get('/vehicles/1235/doors')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        for (let door of body) {
          const { location, locked } = door;

          if (location === 'frontRight') expect(typeof locked).toBe('boolean');
          if (location === 'frontLeft') expect(typeof locked).toBe('boolean');
        }

        expect(body['backLeft']).toBe(undefined);
        expect(body['backRight']).toBe(undefined);
        expect(body.length).toBe(2);
      }));

  it ('It handles a Bad ID',
    () => request(app)
      .get('/vehicles/1234123/doors')
      .expect('Content-Type', /json/)
      .expect(404)
      .then(({ body }) => {
        const { status } = body;

        expect(status).toBe('404');
        expect(body).toHaveProperty('reason');
      }));
});