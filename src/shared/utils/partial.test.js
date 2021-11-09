import partial from './partial';

test('returns a partial application of the function', () => {
  const fn = jest.fn();

  const partialFn = partial(fn, 'foo', 'bar');
  partialFn('baz');

  expect(fn).toBeCalledTimes(1);
  expect(fn).toBeCalledWith('foo', 'bar', 'baz');
});
