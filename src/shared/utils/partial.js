export default function partial(fn, ...initialArgs) {
  return (...finalArgs) => fn(...initialArgs, ...finalArgs);
}
