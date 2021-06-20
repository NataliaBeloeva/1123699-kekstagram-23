import {isEscEvent} from './util.js';

const body = document.querySelector('body');
const fullsize = document.querySelector('.big-picture');
const fullsizeImg = fullsize.querySelector('.big-picture__img img');
const fullsizeLikes = fullsize.querySelector('.likes-count');
const fullsizeCommentsCount = fullsize.querySelector('.social__comment-count');
const fullsizeCommentsTotal = fullsize.querySelector('.comments-count');
const fullsizeComments = fullsize.querySelector('.social__comments');
const fullsizeCommentsLoader = fullsize.querySelector('.comments-loader');
const fullsizeDescription = fullsize.querySelector('.social__caption');
const fullsizeCancel = fullsize.querySelector('.big-picture__cancel');

const commentsAvatarSizes = {
  WIDTH: 35,
  HEIGHT: 35,
};

const closeFullsize = () => {
  fullsize.classList.add('hidden');
  body.classList.remove('modal-open');
};

const documentKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFullsize();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const createCommentTemplate = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  const commentItemImg = document.createElement('img');
  const commentItemText = document.createElement('p');

  commentItem.classList.add('social__comment');

  commentItemImg.classList.add('social__picture');
  commentItemImg.src = avatar;
  commentItemImg.alt = name;
  commentItemImg.width = commentsAvatarSizes.WIDTH;
  commentItemImg.height = commentsAvatarSizes.HEIGHT;

  commentItemText.classList.add('social__text');
  commentItemText.textContent = message;

  commentItem.appendChild(commentItemImg);
  commentItem.appendChild(commentItemText);

  return commentItem;
};

const renderFullsize = ({url, likes, comments, description}) => {
  fullsizeImg.src = url;
  fullsizeLikes.textContent = likes;
  fullsizeCommentsTotal.textContent = comments.length;
  fullsizeDescription.textContent = description;
  fullsizeComments.innerHTML = '';

  comments.forEach((comment) => {
    fullsizeComments.appendChild(createCommentTemplate(comment));
  });

  fullsizeCommentsCount.classList.add('hidden');
  fullsizeCommentsLoader.classList.add('hidden');
};

const openFullsize = (element) => {
  renderFullsize(element);
  fullsize.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);

  fullsizeCancel.addEventListener('click', () => {
    closeFullsize();
    document.removeEventListener('keydown', documentKeydownHandler);
  });
};

export {openFullsize};
