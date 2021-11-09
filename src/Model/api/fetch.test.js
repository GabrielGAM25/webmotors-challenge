import client from 'shared/api/client';

import fetchModels from './fetch';

jest.mock('shared/api/client');

afterEach(() => jest.clearAllMocks());

test('calls the client with the correct url', async () => {
  client.get.mockResolvedValueOnce();
  const brandId = 1;
  const url = '/Model?MakeID=1';

  await fetchModels(brandId);

  expect(client.get).toBeCalledWith(url);
});

test('returns an empty array on error', async () => {
  client.get.mockRejectedValueOnce();

  const response = await fetchModels();

  expect(response).toEqual([]);
});

test('returns the formatted response on success', async () => {
  const mockResponse = { data: [{ ID: 1, Name: 'Agile' }] };
  client.get.mockResolvedValueOnce(mockResponse);

  const response = await fetchModels();

  expect(response).toEqual([{ id: 1, name: 'Agile' }]);
});
