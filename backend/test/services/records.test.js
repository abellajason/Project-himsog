const app = require('../../src/app');

describe('\'records\' service', () => {
  it('registered the service', () => {
    const service = app.service('records');
    expect(service).toBeTruthy();
  });
});
