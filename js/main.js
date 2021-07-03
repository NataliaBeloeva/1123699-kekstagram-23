import {createSimilarPosts} from './data.js';
import {renderAllPictures} from './render-pictures.js';
import {setData} from './gallery.js';
import './upload-form.js';
import './upload-edit.js';

const POSTS_COUNT = 25;
const similarPictures = createSimilarPosts(POSTS_COUNT);

renderAllPictures(similarPictures);
setData(similarPictures);

