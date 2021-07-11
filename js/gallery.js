import {openFullsize} from './fullsize-picture.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let data;

const renderPicture = ({id, url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  picture.dataset.id = id;
  pictureImg.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return picture;
};

const pictureClickHandler = (evt) => {
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

const removePictures = () => {
  pictureList.querySelectorAll('.picture').forEach((item) => item.remove());
};

const renderPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();
  data = pictures;

  removePictures();

  pictures.forEach((item) => {
    pictureListFragment.appendChild(renderPicture(item));
  });

  pictureList.appendChild(pictureListFragment);
  pictureList.addEventListener('click', pictureClickHandler);
};

export {renderPictures};
