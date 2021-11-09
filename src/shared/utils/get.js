export default function get(key, object, fallback) {
  return (object && object[key] !== undefined) ? object[key] : fallback;
}
