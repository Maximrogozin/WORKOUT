export function sortByProductId(array) {
  return array.slice().sort((a, b) => a.productId - b.productId);
}
