import {openFullsize} from './fullsize-picture.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let pictures;

const renderPicture = ({id, url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureLikesAmount = picture.querySelector('.picture__likes');
  const pictureCommentsAmount = picture.querySelector('.picture__comments');

  picture.dataset.id = id;
  pictureImg.src = url;
  pictureLikesAmount.textContent = likes;
  pictureCommentsAmount.textContent = comments.length;

  return picture;
};

const pictureListClickHandler = (evt) => {
  const picture = evt.target.closest('.picture');
  if (picture) {
    evt.preventDefault();
    const pictureId = +picture.dataset.id;
    const dataElement = pictures.find(({id}) => id === pictureId);

    if (!dataElement) {
      throw new Error('Element not found');
    }
    openFullsize(dataElement);
  }
};

const removePictures = () => pictureList.querySelectorAll('.picture').forEach((item) => item.remove());

const renderPictures = (data) => {
  const pictureListFragment = document.createDocumentFragment();
  pictures = data;

  removePictures();

  pictures.forEach((item) => pictureListFragment.appendChild(renderPicture(item)));

  pictureList.appendChild(pictureListFragment);
  pictureList.addEventListener('click', pictureListClickHandler);
};

export {renderPictures};
