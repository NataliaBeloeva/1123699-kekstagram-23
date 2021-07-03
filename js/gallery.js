import {openFullsize} from './fullsize-picture.js';

const previewSection = document.querySelector('.pictures');

let data;

const previewClickHandler = (evt) => {
  const preview = evt.target.closest('.picture');
  if (preview) {
    evt.preventDefault();
    const previewId = +preview.dataset.id;
    const dataElement = data.find(({id}) => id === previewId);

    if (!dataElement) {
      throw new Error('Element not found');
    }
    openFullsize(dataElement);
  }
};

previewSection.addEventListener('click', previewClickHandler);

const setData = (photos) => {
  data = photos;
};

export {setData};

