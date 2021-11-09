export default function mapKeys(keysMapping, sourceObj) {
  return Object.keys(sourceObj).reduce(
    (newObj, key) => ({ ...newObj, [keysMapping[key] || key]: sourceObj[key] }),
    {},
  );
}
