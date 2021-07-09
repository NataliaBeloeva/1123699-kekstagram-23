import {getData} from './api.js';
import {renderAllPictures} from './gallery.js';
import './upload-form.js';

getData((pictures) => {
  renderAllPictures(pictures);
});

