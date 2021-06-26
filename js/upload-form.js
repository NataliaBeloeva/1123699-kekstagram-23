import {isEscEvent} from './util.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAGS_LENGTH = 20;
const HASHTAG_REGEX =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadDescription = uploadForm.querySelector('.text__description');
const uploadHashtag = uploadForm.querySelector('.text__hashtags');

const isUploadFormActiveField = () => document.activeElement === uploadHashtag || document.activeElement === uploadDescription;

const setInputInvalid = (errorMsg) => {
  uploadHashtag.classList.add('is-invalid');
  uploadHashtag.setCustomValidity(errorMsg);
};

const setInputValid = () => {
  uploadHashtag.classList.remove('is-invalid');
  uploadHashtag.setCustomValidity('');
};

const hashtagInputHandler = () => {
  let hashtagValid = true;
  let hashtagsLength = 0;

  if (uploadHashtag.value !== '') {
    const hashtagsSplit = uploadHashtag.value.trim().split(' ');
    const hashtags = hashtagsSplit.map((item) => item.toLowerCase());
    const hashtagSet = new Set(hashtags);

    for (let i = 0; i < hashtags.length; i++) {
      hashtagsLength = hashtags[i].length;
      hashtagValid = hashtagValid && HASHTAG_REGEX.test(hashtags[i]);
    }

    if (hashtags.length > MAX_HASHTAG_COUNT) {
      setInputInvalid(`Нельзя указать больше чем ${MAX_HASHTAG_COUNT} хештегов`);
    } else if (hashtags.includes('#')) {
      setInputInvalid('Хештег не может состоять только из одной решётки');
    } else if (hashtagsLength > MAX_HASHTAGS_LENGTH) {
      setInputInvalid(`Максимальная длина одного хештега ${MAX_HASHTAGS_LENGTH} символов, включая решётку`);
    } else if (!hashtagValid) {
      setInputInvalid('Строка должна начинаться с решетки, состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д');
    } else if (hashtags.length !== hashtagSet.size) {
      setInputInvalid('Один и тот же хэштег не может быть использован дважды. Хештеги нечувствительны к регистру');
    } else {
      setInputValid();
    }
    uploadHashtag.reportValidity();
  } else {
    setInputValid();
  }
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  setInputValid();
  uploadHashtag.removeEventListener('input', hashtagInputHandler);
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

const uploadFileChangeHandler = () => {
  openUploadForm();
};

uploadFile.addEventListener('change', uploadFileChangeHandler);

