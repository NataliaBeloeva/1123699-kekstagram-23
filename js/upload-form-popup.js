import {isEscEvent} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const popupTemplates = {
  success: successTemplate,
  error: errorTemplate,
};

const removePopup = () => {
  const popup = document.querySelector('.success') || document.querySelector('.error');
  if (popup) {
    popup.remove();
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', documentKeydownHandler);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', documentClickHandler);
  }
};

const documentKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removePopup();
  }
};

const documentClickHandler = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    removePopup();
  }
};

const popupBtnClickHandler = () => {
  removePopup();
};

const renderPopup = (type) => {
  const popup = popupTemplates[type].cloneNode(true);
  document.body.appendChild(popup);

  const popupBtn = popup.querySelector('button');

  popupBtn.addEventListener('click', popupBtnClickHandler);
  document.addEventListener('click', documentClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

export {renderPopup};

