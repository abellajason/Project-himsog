const app = require('../../src/app');

describe('\'children\' service', () => {
  it('registered the service', () => {
    const service = app.service('children');
    expect(service).toBeTruthy();
  });
});
