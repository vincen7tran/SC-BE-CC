const request = require('supertest');
const app = require('../server/index');

describe('Post Engine Commands by ID Tests', () => {
  it ('It properly posts a "START" engine command for Vehicle ID 1234',
    () => request(app)
      .post('/vehicles/1234/engine')
      .send({ action: 'START' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        const { status } = res;

        if (status !== 200 && status !== 500) throw new Error('Status Code is NOT 200 or 500!');
      })
      .then(({ body }) => {
        const { status } = body;

        expect(['success', 'error']).toContain(status);
      }));
  
  it ('It properly posts a "STOP" engine command for Vehicle ID 1235',
    () => request(app)
      .post('/vehicles/1235/engine')
      .send({ action: 'STOP' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        const { status } = res;

        if (status !== 200 && status !== 500) throw new Error('Status Code is NOT 200 or 500!');
      })
      .then(({ body }) => {
        const { status } = body;

        expect(['success', 'error']).toContain(status);
      }));

  it ('It handles an Invalid Command',
    () => request(app)
      .post('/vehicles/1234/engine')
      .send({ action: 'INVALID' })
      .expect('Content-Type', /json/)
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty('reason');
      }));

  it ('It handles a Bad ID',
    () => request(app)
      .post('/vehicles/1234123/engine')
      .send({ action: 'START' })
      .expect('Content-Type', /json/)
      .expect(404)
      .then(({ body }) => {
        expect(body).toHaveProperty('reason');
      }));
});