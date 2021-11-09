import { useEffect, useRef } from 'react';

export default function useAsyncEffect(asyncFn, setState, dependencies) {
  const isMountedRef = useRef(false);

  const mountComponent = () => { isMountedRef.current = true; };
  useEffect(mountComponent, []);

  const unmountComponent = () => { isMountedRef.current = false; };
  useEffect(() => unmountComponent, []);

  const performAsyncFn = () => {
    asyncFn().then((newState) => isMountedRef.current && setState(newState));
  };
  useEffect(performAsyncFn, [...dependencies, asyncFn, setState]);
}
