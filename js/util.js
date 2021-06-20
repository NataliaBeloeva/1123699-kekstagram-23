const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getOneOrTwoRandomArrayElements = (elements) => {
  const sortedElements = elements.sort(() => 0.5 - Math.random());
  const twoElements = sortedElements.slice(0, getRandomPositiveInteger(1, 2));
  return twoElements;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const checkStringLength = (string, length) => string.length <= length;

export {getRandomPositiveInteger, getRandomArrayElement, getOneOrTwoRandomArrayElements, isEscEvent, checkStringLength};
