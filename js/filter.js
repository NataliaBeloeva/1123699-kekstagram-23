import {getRandomUniqueArrayElement, debounce} from './util.js';
import {renderPictures} from './gallery.js';

const PICTURES_RANDOM_MAX_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filterList = document.querySelector('.img-filters');

let pictures;

const applyFilterDefault = (data) => data;

const applyFilterRandom = (data) => {
  const randomUniqueNumbers = getRandomUniqueArrayElement(0, data.length - 1, PICTURES_RANDOM_MAX_COUNT);
  const picturesRandom = data.filter((item) => randomUniqueNumbers.includes(item.id));
  return picturesRandom;
};

const applyFilterDiscussed = (data) => {
  const picturesDiscussed = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  return picturesDiscussed;
};

const filters = {
  'filter-default': applyFilterDefault,
  'filter-random': applyFilterRandom,
  'filter-discussed': applyFilterDiscussed,
};

const setFilterActive = (evt) => {
  if (evt.target.matches('.img-filters__button')) {
    const filterBtn = evt.target;

    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filterBtn.classList.add('img-filters__button--active');
  }
};

const handleFilterClick = debounce((evt) => {
  if (evt.target.matches('.img-filters__button')) {
    const filterCurrent = evt.target.id;
    const filteredPictures = filters[filterCurrent](pictures);

    renderPictures(filteredPictures);
  }
}, DEBOUNCE_DELAY);

const filterListClickHandler = (evt) => {
  setFilterActive(evt);
  handleFilterClick(evt);
};

const activateFilters = (data) => {
  pictures = data;
  filterList.classList.remove('img-filters--inactive');
  filterList.addEventListener('click', filterListClickHandler);
};

export {activateFilters};
