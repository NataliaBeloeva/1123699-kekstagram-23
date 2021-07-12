import {createRequest} from './service.js';
import {showAlert, debounce} from './util.js';
import {renderPictures} from './gallery.js';
import {addFilterHandlers} from './filter.js';
import './upload-form.js';

const DOWNLOAD_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const ALERT_TIMEOUT = 5000;
const ALERT_MSG = 'Ошибка загрузки данных. Попробуйте еще раз';
const DEBOUNCE_DELAY = 500;

const onRequestSuccess = (data) => {
  renderPictures(data);
  addFilterHandlers(debounce(renderPictures, DEBOUNCE_DELAY), data);
};

createRequest(
  onRequestSuccess,
  () => showAlert(ALERT_MSG, ALERT_TIMEOUT),
  DOWNLOAD_URL,
  {
    method: 'GET',
  },
);

