import client from 'shared/api/client';

import fetchBrands from './fetch';

jest.mock('shared/api/client');

afterEach(() => jest.clearAllMocks());

test('calls the client with the correct url', async () => {
  client.get.mockResolvedValueOnce();
  const url = '/Make';

  await fetchBrands();

  expect(client.get).toBeCalledWith(url);
});

test('returns an empty array on error', async () => {
  client.get.mockRejectedValueOnce();

  const response = await fetchBrands();

  expect(response).toEqual([]);
});

test('returns the formatted response on success', async () => {
  const mockResponse = { data: [{ ID: 1, Name: 'Chevrolet' }] };
  client.get.mockResolvedValueOnce(mockResponse);

  const response = await fetchBrands();

  expect(response).toEqual([{ id: 1, name: 'Chevrolet' }]);
});
