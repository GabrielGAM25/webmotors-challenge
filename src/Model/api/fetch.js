import client from 'shared/api/client';
import partial from 'shared/utils/partial';
import mapKeys from 'shared/utils/mapKeys';

export default function fetchModels(brandId) {
  return (
    client.get(`/Model?MakeID=${brandId}`)
      .then(({ data }) => data.map(partial(mapKeys, { ID: 'id', Name: 'name' })))
      .catch(() => [])
  );
}
