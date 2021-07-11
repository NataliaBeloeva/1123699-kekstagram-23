import {getRandomUniqueArrayElement} from './util.js';

const PICTURES_RANDOM_MAX_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');

let currentFilter = filterDefault;

const applyFilterDefault = (pictures) => pictures;

const applyFilterRandom = (pictures) => {
  const randomUniqueNumbers = getRandomUniqueArrayElement(0, pictures.length - 1, PICTURES_RANDOM_MAX_COUNT);
  const picturesRandom = pictures.filter((picture) => randomUniqueNumbers.includes(picture.id));
  return picturesRandom;
};

const applyFilterDiscussed = (pictures) => {
  const picturesDiscussed = pictures.slice().sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
  return picturesDiscussed;
};

const addFilterHandlers = (cb, pictures) => {
  const filters = {
    'filter-default': applyFilterDefault,
    'filter-random': applyFilterRandom,
    'filter-discussed': applyFilterDiscussed,
  };

  imgFilters.classList.remove('img-filters--inactive');

  imgFilters.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      currentFilter.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      currentFilter = evt.target;

      const currentFilterName = evt.target.id;
      const filteredPictures = filters[currentFilterName](pictures);

      cb(filteredPictures);
    }
  });
};


export {addFilterHandlers};
