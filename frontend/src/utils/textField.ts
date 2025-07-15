export function hasempty(values: string[]) {
  for (const value of values) {
    if (value.length == 0) return true;
  }
  return false;
}
export function isEmpty(value: string) {
  return value.length === 0;
}
export function isRequired(value: string) {
  return isEmpty(value) ? "field is isRequired" : false;
}
