const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderOnePicture = ({id, url, likes, comments}) => {
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

const renderAllPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((item) => {
    pictureListFragment.appendChild(renderOnePicture(item));
  });
  pictureList.appendChild(pictureListFragment);
};

export {renderAllPictures};
