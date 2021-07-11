import {createRequest} from './service.js';
import {showAlert} from './util.js';
import {renderAllPictures} from './gallery.js';
import './upload-form.js';

const DOWNLOAD_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const ALERT_TIMEOUT = 5000;
const ALERT_MSG = 'Ошибка загрузки данных. Попробуйте еще раз';

createRequest(
  (pictures) => renderAllPictures(pictures),
  () => showAlert(ALERT_MSG, ALERT_TIMEOUT),
  DOWNLOAD_URL,
  {
    method: 'GET',
  },
);

