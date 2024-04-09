export function convertText(input: string) {
  const words = input.split('');
  const convertedWords = words.map((word, index) => {
    if (index === 0) {
      return word.toUpperCase();
    }
    if(word === ".") {
      return word.replace(word, ' ')
    }
    if (word === word.toUpperCase()) {
      return ' ' + word;
    }
    return word.charAt(0).toLowerCase() + word.slice(1);
  });
  return convertedWords.join('');
}

export const formatCardNumber = (value: string) => {

  const formattedValue = value.replace(/\d{4}(?!\s)/g, '$& ');

  return formattedValue.trim();

}