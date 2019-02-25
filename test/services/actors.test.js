const assert = require('assert');
const app = require('../../src/app');

describe('\'actors\' service', () => {
  it('registered the service', () => {
    const service = app.service('actors');

    assert.ok(service, 'Registered the service');
  });
});
