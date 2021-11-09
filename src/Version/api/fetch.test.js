import client from 'shared/api/client';

import fetchVersions from './fetch';

jest.mock('shared/api/client');

afterEach(() => jest.clearAllMocks());

test('calls the client with the correct url', async () => {
  client.get.mockResolvedValueOnce();
  const brandId = 1;
  const url = '/Version?ModelID=1';

  await fetchVersions(brandId);

  expect(client.get).toBeCalledWith(url);
});

test('returns an empty array on error', async () => {
  client.get.mockRejectedValueOnce();

  const response = await fetchVersions();

  expect(response).toEqual([]);
});

test('returns the formatted response on success', async () => {
  const mockResponse = { data: [{ ID: 1, Name: '1.5 DX 16V FLEX 4P AUTOMÁTICO' }] };
  client.get.mockResolvedValueOnce(mockResponse);

  const response = await fetchVersions();

  expect(response).toEqual([{ id: 1, name: '1.5 DX 16V FLEX 4P AUTOMÁTICO' }]);
});
