const app = require('../../src/app');

describe('\'donations\' service', () => {
  it('registered the service', () => {
    const service = app.service('donations');
    expect(service).toBeTruthy();
  });
});
