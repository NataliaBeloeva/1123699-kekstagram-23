const MAX_HASHTAG_COUNT = 5;
const HASHTAG_REGEX =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const uploadForm = document.querySelector('.img-upload__form');

const uploadDescription = uploadForm.querySelector('.text__description');
const uploadHashtag = uploadForm.querySelector('.text__hashtags');

const isUploadFormActiveField = () => document.activeElement === uploadHashtag || document.activeElement === uploadDescription;

const setInputInvalid = (errorMsg) => {
  uploadHashtag.style.outline = '2px solid red';
  uploadHashtag.setCustomValidity(errorMsg);
};

const setInputValid = () => {
  uploadHashtag.style.outline = 'revert';
  uploadHashtag.setCustomValidity('');
};

const validateHashtag = (hashtagString) => {
  const hashtags = hashtagString.trim().split(' ').map((item) => item.toLowerCase());

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    setInputInvalid(`Нельзя указать больше чем ${MAX_HASHTAG_COUNT} хештегов`);
    return;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    const hashtagValid = HASHTAG_REGEX.test(hashtag);

    if (!hashtagValid) {
      setInputInvalid('Максимальная длина одного хештега 20 символов, включая решётку, должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д');
      return;
    }
    if (hashtags.includes(hashtag, i + 1)) {
      setInputInvalid('Один и тот же хэштег не может быть использован дважды. Хештеги нечувствительны к регистру');
      return;
    }
  }
};

const uploadHashtagInputHandler = () => {
  const hashtagString = uploadHashtag.value;

  setInputValid();
  if (hashtagString !== '') {
    validateHashtag(hashtagString);
  }
  uploadHashtag.reportValidity();
};

export {isUploadFormActiveField, setInputValid, uploadHashtagInputHandler};
