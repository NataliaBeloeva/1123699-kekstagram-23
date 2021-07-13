import {isEscEvent} from './util.js';

const AVATAR_SIZE = 35;
const COMMENTS_STEP = 5;

const fullsize = document.querySelector('.big-picture');
const fullsizeImg = fullsize.querySelector('.big-picture__img img');
const fullsizeLikesCount = fullsize.querySelector('.likes-count');
const fullsizeCommentsCount = fullsize.querySelector('.social__comment-count');
const fullsizeCommentsShown = fullsize.querySelector('.comments-shown');
const fullsizeCommentsTotal = fullsize.querySelector('.comments-count');
const fullsizeCommentsList = fullsize.querySelector('.social__comments');
const fullsizeCommentsLoader = fullsize.querySelector('.comments-loader');
const fullsizeDescription = fullsize.querySelector('.social__caption');
const fullsizeCancel = fullsize.querySelector('.big-picture__cancel');
const fullsizeFooter = fullsize.querySelector('.social__footer');

let commentsData = [];
let commentsStart = 0;

const createCommentTemplate = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  const commentImg = document.createElement('img');
  const commentText = document.createElement('p');

  comment.classList.add('social__comment');

  commentImg.classList.add('social__picture');
  commentImg.src = avatar;
  commentImg.alt = name;
  commentImg.width = AVATAR_SIZE;
  commentImg.height = AVATAR_SIZE;

  commentText.classList.add('social__text');
  commentText.textContent = message;

  comment.appendChild(commentImg);
  comment.appendChild(commentText);

  return comment;
};

const showCommentsDomElements = () => {
  fullsizeCommentsList.innerHTML = '';
  fullsizeCommentsList.classList.remove('hidden');
  fullsizeCommentsCount.classList.remove('hidden');
  fullsizeCommentsLoader.classList.remove('hidden');
  fullsizeFooter.style.border = '1px solid #cccccc';
};

const hideCommentsDomElements = () => {
  fullsizeCommentsList.classList.add('hidden');
  fullsizeCommentsCount.classList.add('hidden');
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
    fullsizeCommentsList.appendChild(createCommentTemplate(comment));
  });

  fullsizeCommentsShown.textContent = fullsizeCommentsList.children.length;

  if (commentsData.length === fullsizeCommentsList.children.length) {
    fullsizeCommentsLoader.classList.add('hidden');
  }

  commentsStart += COMMENTS_STEP;
};

const fullsizeCommentsLoaderClickHandler = () => renderComments();

const renderFullsize = ({url, likes, comments, description}) => {
  fullsizeImg.src = url;
  fullsizeLikesCount.textContent = likes;
  fullsizeCommentsTotal.textContent = comments.length;
  fullsizeDescription.textContent = description;

  clearComments();
  commentsData = comments;
  renderComments();

  fullsizeCommentsLoader.addEventListener('click', fullsizeCommentsLoaderClickHandler);
};

const closeFullsize = () => {
  fullsize.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', documentKeydownHandler);
};

const documentKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFullsize();
  }
};

const fullsizeCancelClickHandler = () => closeFullsize();

const openFullsize = (element) => {
  renderFullsize(element);
  fullsize.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fullsizeCancel.addEventListener('click', fullsizeCancelClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

export {openFullsize};
