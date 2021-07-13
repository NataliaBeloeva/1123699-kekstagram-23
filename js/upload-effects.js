const DEFAULT_EFFECT = 'none';

const sliderOptionsDefault = {
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
};

const sliderOptionsConfig = {
  chrome: {
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    settings: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    settings: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    settings: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'brightness',
    unit: '',
  },
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormImg = uploadForm.querySelector('.img-upload__preview img');

const sliderWrap = uploadForm.querySelector('.img-upload__effect-level');
const slider = sliderWrap.querySelector('.effect-level__slider');

const effectsList = uploadForm.querySelector('.effects__list');
const effectsLevelInput = uploadForm.querySelector('.effect-level__value');

let currentEffect = DEFAULT_EFFECT;

const changeEffectClassName = (item) => {
  uploadFormImg.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = item.value;
  uploadFormImg.classList.add(`effects__preview--${currentEffect}`);
};

const setEffectFilter = (filterName, value, unit) => {
  uploadFormImg.style.filter = `${filterName}(${value}${unit})`;
};

const updateSlider = (values, handle) => {
  const effectFilter = sliderOptionsConfig[currentEffect].filter;
  const effectUnit = sliderOptionsConfig[currentEffect].unit;

  effectsLevelInput.value = values[handle];
  setEffectFilter(effectFilter, effectsLevelInput.value, effectUnit);
};

const configureSlider = (options) => {
  sliderWrap.classList.remove('hidden');
  if (!slider.noUiSlider) {
    noUiSlider.create(slider, {...sliderOptionsDefault, ...options});
    slider.noUiSlider.on('update', updateSlider);
  } else {
    slider.noUiSlider.updateOptions(options);
  }
  effectsLevelInput.value = options.start;
};

const destroySlider = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  uploadFormImg.style.filter = '';
  uploadFormImg.className = '';
  effectsLevelInput.value = '';
  destroySlider();
  sliderWrap.classList.add('hidden');
};

const effectsListClickHandler = (evt) => {
  if (evt.target.matches('[type=radio]')) {
    changeEffectClassName(evt.target);
    if (currentEffect !== DEFAULT_EFFECT) {
      configureSlider(sliderOptionsConfig[currentEffect].settings);
    } else {
      resetEffects();
    }
  }
};

resetEffects();

effectsList.addEventListener('click', effectsListClickHandler);

export {resetEffects};
