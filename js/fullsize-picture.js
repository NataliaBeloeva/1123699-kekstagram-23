import {isEscEvent} from './util.js';

const AVATAR_SIZE = 35;
const COMMENTS_STEP = 5;

const fullsize = document.querySelector('.big-picture');
const fullsizeImg = fullsize.querySelector('.big-picture__img img');
const fullsizeLikes = fullsize.querySelector('.likes-count');
const fullsizeCommentsCount = fullsize.querySelector('.social__comment-count');
const fullsizeCommentsShown = fullsize.querySelector('.comments-shown');
const fullsizeCommentsTotal = fullsize.querySelector('.comments-count');
const fullsizeComments = fullsize.querySelector('.social__comments');
const fullsizeCommentsLoader = fullsize.querySelector('.comments-loader');
const fullsizeDescription = fullsize.querySelector('.social__caption');
const fullsizeCancel = fullsize.querySelector('.big-picture__cancel');
const fullsizeFooter = fullsize.querySelector('.social__footer');

let commentsData = [];
let commentsStart = 0;

const createCommentTemplate = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  const commentItemImg = document.createElement('img');
  const commentItemText = document.createElement('p');

  commentItem.classList.add('social__comment');

  commentItemImg.classList.add('social__picture');
  commentItemImg.src = avatar;
  commentItemImg.alt = name;
  commentItemImg.width = AVATAR_SIZE;
  commentItemImg.height = AVATAR_SIZE;

  commentItemText.classList.add('social__text');
  commentItemText.textContent = message;

  commentItem.appendChild(commentItemImg);
  commentItem.appendChild(commentItemText);

  return commentItem;
};

const showCommentsDomElements = () => {
  fullsizeComments.innerHTML = '';
  fullsizeCommentsCount.classList.remove('hidden');
  fullsizeComments.classList.remove('hidden');
  fullsizeCommentsLoader.classList.remove('hidden');
  fullsizeFooter.style.border = '1px solid #cccccc';
};

const hideCommentsDomElements = () => {
  fullsizeCommentsCount.classList.add('hidden');
  fullsizeComments.classList.add('hidden');
  fullsizeCommentsLoader.classList.add('hidden');
  fullsizeFooter.style.border = 0;
};

const clearComments = () => {
  commentsData = [];
  commentsStart = 0;
  showCommentsDomElements();
};

const renderComments = () => {
  if (commentsData.length === 0) {
    hideCommentsDomElements();
    return;
  }

  const commentsToLoad = commentsData.slice(commentsStart, commentsStart + COMMENTS_STEP);
  commentsToLoad.forEach((comment) => {
    fullsizeComments.appendChild(createCommentTemplate(comment));
  });

  fullsizeCommentsShown.textContent = fullsizeComments.children.length;
  if (commentsData.length === fullsizeComments.children.length) {
    fullsizeCommentsLoader.classList.add('hidden');
  }

  commentsStart += COMMENTS_STEP;
};

const fullsizeCommentsLoaderClick = () => {
  renderComments();
};

const renderFullsize = ({url, likes, comments, description}) => {
  fullsizeImg.src = url;
  fullsizeLikes.textContent = likes;
  fullsizeCommentsTotal.textContent = comments.length;
  fullsizeDescription.textContent = description;

  clearComments();
  commentsData = comments;
  renderComments();

  fullsizeCommentsLoader.addEventListener('click', fullsizeCommentsLoaderClick);
};

const closeFullsize = () => {
  fullsize.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const documentKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFullsize();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const openFullsize = (element) => {
  renderFullsize(element);
  fullsize.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);

  fullsizeCancel.addEventListener('click', () => {
    closeFullsize();
    document.removeEventListener('keydown', documentKeydownHandler);
  });
};

export {openFullsize};
