import {isEscEvent} from './util.js';
import {fullsize, fullsizeCancel, renderFullsize} from './render-fullsize-picture.js';

const body = document.querySelector('body');

const closeFullsize = () => {
  fullsize.classList.add('hidden');
  body.classList.remove('modal-open');
};

const keyEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFullsize();
  }
};

const openFullsize = () => {
  fullsize.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', keyEscHandler);
};

const previewClickHandler = (data) => {
  const previews = document.querySelectorAll('.picture');
  previews.forEach((item, idx) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullsize();
      renderFullsize(data[idx]);
    });
  });
};

fullsizeCancel.addEventListener('click', () => {
  closeFullsize();
  document.removeEventListener('keydown', keyEscHandler);
});

export {previewClickHandler};

