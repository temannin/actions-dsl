export function addToArray<T>(array: T[], itemOrItems: T | T[]): void {
  if (Array.isArray(itemOrItems)) {
    array.push(...itemOrItems);
  } else {
    array.push(itemOrItems);
  }
}
