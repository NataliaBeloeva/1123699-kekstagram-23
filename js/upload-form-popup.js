import {isEscEvent} from './util.js';

const successDomElements = document.querySelector('#success').content.querySelector('.success');
const errorDomElements = document.querySelector('#error').content.querySelector('.error');

const uploadTypes = {
  success: successDomElements,
  fail: errorDomElements,
};

let uploadResult = '';

const removePopup = () => {
  uploadTypes[uploadResult].remove();
  uploadResult = '';
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', documentKeydownHandler);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', documentClickHandler);
};

const popupBtnClickHandler = () => {
  removePopup();
};

const documentKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removePopup();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const documentClickHandler = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    removePopup();
  }
};

const renderPopup = (result) => {
  uploadResult = result;
  document.body.appendChild(uploadTypes[result]);

  const popupBtn = uploadTypes[result].querySelector('button');

  popupBtn.addEventListener('click', popupBtnClickHandler);
  document.addEventListener('click', documentClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

export {renderPopup};

