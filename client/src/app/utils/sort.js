// сортировка массива с обьектами
export function sortByProductId(array) {
  return array.slice().sort((a, b) => a.productId - b.productId);
}

// обрезка текста на три слова
export function truncateTextToThreeWords(text) {
  const words = text.split(" ");
  if (words.length <= 3) {
    return text;
  }
  return words.slice(0, 3).join(" ") + "...";
}
