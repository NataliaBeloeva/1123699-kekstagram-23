import {createSimilarPosts} from './data.js';
import {renderAllPictures} from './render-pictures.js';

const POSTS_COUNT = 25;
const similarPictures = createSimilarPosts(POSTS_COUNT);

renderAllPictures(similarPictures);
