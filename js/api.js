import {showAlert} from './util.js';

const DOWNLOAD_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const UPLOAD_URL = 'https://23.javascript.pages.academy/kekstagram';
const ALERT_TIMEOUT = 5000;
const ALERT_MSG = 'Ошибка загрузки данных. Попробуйте еще раз';

const getData = (onSuccess) => {
  fetch(DOWNLOAD_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      showAlert(ALERT_MSG, ALERT_TIMEOUT);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(UPLOAD_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
