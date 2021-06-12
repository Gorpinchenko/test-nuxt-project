export function dateToISOString(value) {
  const date = new Date(value);
  return date.toISOString();
}

export function dateToTimestamp(value) {
  const date = new Date(value);
  return date.setHours(0, 0, 0);
}

export function getNowTimestamp() {
  const date = new Date();
  return date.setHours(0, 0, 0);
}
