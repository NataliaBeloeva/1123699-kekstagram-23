import {isEscEvent} from './util.js';

const MAX_HASHTAG_COUNT = 5;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadDescription = uploadForm.querySelector('.text__description');
const uploadHashtag = uploadForm.querySelector('.text__hashtags');
const uploadHashtagRegex =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const isUploadFormActiveField = () => document.activeElement === uploadHashtag || document.activeElement === uploadDescription;

const hashtagInputHandler = () => {
  const hashtags = uploadHashtag.value.toLowerCase().split(' ').sort();

  hashtags.forEach((item) => {
    if (hashtags.length > MAX_HASHTAG_COUNT) {
      uploadHashtag.setCustomValidity(`Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`);
    } else if (!uploadHashtagRegex.test(item)) {
      uploadHashtag.setCustomValidity('Хештег должен начинаться с символа # и содержать от 1 до 20 букв или цифр');
    } else {
      uploadHashtag.setCustomValidity('');
    }
  });

  hashtags.forEach((item, idx) => {
    if (hashtags[idx] === hashtags[idx + 1]) {
      return uploadHashtag.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
    }
  });

  uploadHashtag.reportValidity();
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  uploadCancel.removeEventListener('click', closeUploadForm);
};

const documentKeydownHandler = (evt) => {
  if (isEscEvent(evt) && !isUploadFormActiveField()) {
    evt.preventDefault();
    closeUploadForm();
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadHashtag.addEventListener('input', hashtagInputHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  uploadCancel.addEventListener('click', () => {
    closeUploadForm();
    document.removeEventListener('keydown', documentKeydownHandler);
  });
};

uploadFile.addEventListener('change', openUploadForm);

