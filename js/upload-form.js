import {isEscEvent} from './util.js';
import {isUploadFormActiveField, setInputValid, uploadHashtagInputHandler} from './validator.js';
import {resetScale} from './upload-scale.js';
import {resetEffects} from './upload-effects.js';
import {createRequest} from './api.js';
import {renderPopup} from './upload-form-popup.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const UPLOAD_URL = 'https://23.javascript.pages.academy/kekstagram';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadHashtag = uploadForm.querySelector('.text__hashtags');
const uploadFormImg = uploadForm.querySelector('.img-upload__preview img');
const uploadFormEffectPreviews = uploadForm.querySelectorAll('.effects__preview');

const resetUploadImage = () => {
  uploadFormImg.src = '';
  uploadFormEffectPreviews.forEach((item) => item.style.backgroundImage = 'none');
};

const resetUpload = () => {
  resetUploadImage();
  resetScale();
  resetEffects();
};

const closeUploadForm = () => {
  setInputValid();
  resetUpload();
  uploadForm.reset();

  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadHashtag.removeEventListener('input', uploadHashtagInputHandler);
  uploadCancel.removeEventListener('click', closeUploadForm);

  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', documentKeydownHandler);
};

const documentKeydownHandler = (evt) => {
  if (isEscEvent(evt) && !isUploadFormActiveField()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const uploadCancelClickHandler = () => closeUploadForm();

const openUploadForm = () => {
  resetUpload();

  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadHashtag.addEventListener('input', uploadHashtagInputHandler);
  uploadCancel.addEventListener('click', uploadCancelClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

const uploadImage = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const result = reader.result;
      uploadFormImg.src = result;
      uploadFormEffectPreviews.forEach((item) => item.style.backgroundImage = `url(${result})`);
    });
    reader.readAsDataURL(file);
  } else {
    uploadFile.value = '';
    resetUploadImage();
  }
};

const uploadFileChangeHandler = () => {
  openUploadForm();
  uploadImage();
};

const setFormSendSuccess = () => {
  closeUploadForm();
  renderPopup('success');
};

const setFormSendError = () => {
  closeUploadForm();
  renderPopup('error');
};

uploadFile.addEventListener('change', uploadFileChangeHandler);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData =  new FormData(evt.target);
  createRequest(
    setFormSendSuccess,
    setFormSendError,
    UPLOAD_URL,
    {
      method: 'POST',
      body: formData,
    },
  );
});


