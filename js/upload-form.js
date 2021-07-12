import {isEscEvent} from './util.js';
import {isUploadFormActiveField, setInputValid, hashtagInputHandler} from './validator.js';
import {resetScale} from './upload-scale.js';
import {resetEffects} from './upload-effects.js';
import {createRequest} from './api.js';
import {renderPopup} from './upload-form-popup.js';

const UPLOAD_URL = 'https://23.javascript.pages.academy/kekstagram';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadHashtag = uploadForm.querySelector('.text__hashtags');

const resetUploadEdit = () => {
  resetScale();
  resetEffects();
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  setInputValid();
  resetUploadEdit();
  uploadForm.reset();

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
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetUploadEdit();

  uploadHashtag.addEventListener('input', hashtagInputHandler);
  document.addEventListener('keydown', documentKeydownHandler);

  uploadCancel.addEventListener('click', () => {
    closeUploadForm();
    document.removeEventListener('keydown', documentKeydownHandler);
  });
};

const uploadFileChangeHandler = () => {
  openUploadForm();
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


