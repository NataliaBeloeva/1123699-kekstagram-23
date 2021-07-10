import {openFullsize} from './fullsize-picture.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture = ({id, url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');

  pictureElement.dataset.id = id;
  pictureImg.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return pictureElement;
};

const pictureClickHandler = (evt, data) => {
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

const renderAllPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((item) => {
    pictureListFragment.appendChild(renderPicture(item));
  });

  pictureList.appendChild(pictureListFragment);
  pictureList.addEventListener('click', (evt) => {
    pictureClickHandler(evt, pictures);
  });
};

export {renderAllPictures};
