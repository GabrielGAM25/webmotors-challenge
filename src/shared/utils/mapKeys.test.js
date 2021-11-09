import mapKeys from './mapKeys';

test('creates a new object with the updated keys', () => {
  const originalObject = { old1: 1, old2: 'foo', unchanged: 'baz' };

  const expectedNewObject = { new1: 1, new2: 'foo', unchanged: 'baz' };

  expect(mapKeys({ old1: 'new1', old2: 'new2' }, originalObject)).toEqual(expectedNewObject);
});
