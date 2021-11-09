import client from 'shared/api/client';
import partial from 'shared/utils/partial';
import mapKeys from 'shared/utils/mapKeys';

export default function fetchBrands() {
  return (
    client.get('/Make')
      .then(({ data }) => data.map(partial(mapKeys, { ID: 'id', Name: 'name' })))
      .catch(() => [])
  );
}
