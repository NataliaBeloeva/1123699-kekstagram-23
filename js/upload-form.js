import {isEscEvent} from './util.js';
import {isUploadFormActiveField, setInputValid, hashtagInputHandler} from './validator.js';
import {resetScale} from './upload-scale.js';
import {resetEffects} from './upload-effects.js';
import {createRequest} from './api.js';
import {renderPopup} from './upload-form-popup.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const UPLOAD_URL = 'https://23.javascript.pages.academy/kekstagram';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadHashtag = uploadForm.querySelector('.text__hashtags');
const uploadFormImg = uploadForm.querySelector('.img-upload__preview img');
const uploadFormEffectPreviews = uploadForm.querySelectorAll('.effects__preview');

const resetUploadEdit = () => {
  resetScale();
  resetEffects();
};

const closeUploadForm = () => {
  setInputValid();
  resetUploadEdit();
  uploadForm.reset();

  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadHashtag.removeEventListener('input', hashtagInputHandler);
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
  resetUploadEdit();

  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadHashtag.addEventListener('input', hashtagInputHandler);
  document.addEventListener('keydown', documentKeydownHandler);

  uploadCancel.addEventListener('click', () => {
    closeUploadForm();
    document.removeEventListener('keydown', documentKeydownHandler);
  });
};

const uploadImage = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  uploadFormImg.src = '';
  uploadFormEffectPreviews.forEach((item) => item.style.backgroundImage = 'none');

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const result = reader.result;
      uploadFormImg.src = result;
      uploadFormEffectPreviews.forEach((item) => item.style.backgroundImage = `url(${result})`);
    });
    reader.readAsDataURL(file);
  }
};

const uploadFileChangeHandler = () => {
  openUploadForm();
  uploadImage();
};

const onFormSendSuccess = () => {
  closeUploadForm();
  renderPopup('success');
};

const onFormSendError = () => {
  closeUploadForm();
  renderPopup('error');
};

uploadFile.addEventListener('change', uploadFileChangeHandler);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData =  new FormData(evt.target);

  createRequest(
    onFormSendSuccess,
    onFormSendError,
    UPLOAD_URL,
    {
      method: 'POST',
      body: formData,
    },
  );
});


