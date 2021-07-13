import {createRequest} from './api.js';
import {showAlert} from './util.js';
import {renderPictures} from './gallery.js';
import {activateFilters} from './filter.js';
import './upload-form.js';

const DOWNLOAD_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const ALERT_TIMEOUT = 5000;
const ALERT_MSG = 'Ошибка загрузки данных. Попробуйте еще раз';

const onRequestSuccess = (data) => {
  renderPictures(data);
  activateFilters(data);
};

const onRequestError = () => showAlert(ALERT_MSG, ALERT_TIMEOUT);

createRequest(
  onRequestSuccess,
  onRequestError,
  DOWNLOAD_URL,
  {
    method: 'GET',
  },
);

