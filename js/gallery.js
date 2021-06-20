import {openFullsize} from './fullsize-picture.js';

const addPreviewClickHandlers = (data) => {
  const previewSection = document.querySelector('.pictures');

  const previewClickHandler = (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const onePreview = evt.target.closest('.picture');
      const onePreviewId = +onePreview.getAttribute('data-id');

      openFullsize(data.find(({id}) => id === onePreviewId));
    }
  };

  previewSection.addEventListener('click', previewClickHandler);
};


export {addPreviewClickHandlers};

