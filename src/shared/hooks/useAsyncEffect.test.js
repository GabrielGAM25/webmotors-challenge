import { waitFor } from '@testing-library/dom';
import { renderHook, cleanup } from '@testing-library/react-hooks';

import useAsyncEffect from './useAsyncEffect';

beforeEach(jest.useFakeTimers);
afterEach(jest.useRealTimers);

test('calls setState if the Promise is fullfilled while mounted', async () => {
  const mockFn = jest.fn(() => new Promise((resolve) => setTimeout(() => resolve('foo'), 100)));
  const mockSetState = jest.fn();

  renderHook(() => useAsyncEffect(mockFn, mockSetState, []));
  jest.runAllTimers();

  await waitFor(() => expect(mockSetState).toBeCalledWith('foo'));
});

test("doesn't call setState if the Promise is fullfilled after unmount", async () => {
  const mockFn = jest.fn(() => new Promise((resolve) => setTimeout(() => resolve('foo'), 100)));
  const mockSetState = jest.fn();

  renderHook(() => useAsyncEffect(mockFn, mockSetState, []));
  cleanup();
  jest.runAllTimers();

  await waitFor(() => expect(mockSetState).not.toBeCalled());
});
