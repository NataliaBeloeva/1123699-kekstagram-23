const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomUniqueArrayElement = (min, max, length) => {
  const elements = [];
  while (elements.length !== length) {
    const number = getRandomPositiveInteger(min, max);
    if (!elements.includes(number)) {
      elements.push(number);
    }
  }
  return elements;
};

const getOneOrTwoRandomArrayElements = (elements) => {
  const sortedElements = elements.sort(() => 0.5 - Math.random());
  const twoElements = sortedElements.slice(0, getRandomPositiveInteger(1, 2));
  return twoElements;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const showAlert = (message, timeoutDelay) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, timeoutDelay);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomPositiveInteger, getRandomArrayElement, getOneOrTwoRandomArrayElements, isEscEvent, showAlert, getRandomUniqueArrayElement, debounce};
