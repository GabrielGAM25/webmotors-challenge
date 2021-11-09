import config from 'shared/utils/config';

import client from './client';

jest.mock('shared/utils/config', () => ({
  __esModule: true,
  default: {
    api: {
      baseUrl: 'http://baseUrl.test',
    },
  },
}));

test('set the correct defaults', () => {
  const expectedDefaults = {
    baseURL: `${config.api.baseUrl}/api/OnlineChallenge`,
    method: 'get',
    headers: expect.objectContaining({
      'Content-Type': 'application/json',
    }),
  };

  expect(client.defaults).toEqual(expect.objectContaining(expectedDefaults));
});
