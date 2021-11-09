import get from './get';

test('returns the value corresponding to the key', () => {
  const test = { foo: 'bar' };
  expect(get('foo', test)).toEqual('bar');
});

test('returns the fallback value the key is not found', () => {
  const test = { foo: 'bar' };
  expect(get('bar', test, 'baz')).toEqual('baz');
});
