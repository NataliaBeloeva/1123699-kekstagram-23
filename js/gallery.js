import {openFullsize} from './fullsize-picture.js';

const addPreviewClickHandlers = (data) => {
  const previewSection = document.querySelector('.pictures');

  const previewClickHandler = (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const onePreview = evt.target.closest('.picture');
      const onePreviewId = +onePreview.dataset.id;
      const dataElement = data.find(({id}) => id === onePreviewId);

      if (!dataElement) {
        throw new Error('Element not found');
      }
      openFullsize(dataElement);
    }
  };

  previewSection.addEventListener('click', previewClickHandler);
};


export {addPreviewClickHandlers};

