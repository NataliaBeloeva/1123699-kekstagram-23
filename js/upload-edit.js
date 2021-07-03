const SCALE_STEP = 25;
const DEFAULT_EFFECT = 'none';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormImg = uploadForm.querySelector('.img-upload__preview img');

const scale = uploadForm.querySelector('.img-upload__scale');
const scaleControlSmaller = scale.querySelector('.scale__control--smaller');
const scaleControlBigger = scale.querySelector('.scale__control--bigger');
const scaleControlText = scale.querySelector('.scale__control--value');

const sliderWrap = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = sliderWrap.querySelector('.effect-level__slider');

const effectsList = uploadForm.querySelector('.effects__list');
const effectsLevelValue = uploadForm.querySelector('.effect-level__value');

const scaleValue = {
  MIN: 25,
  MAX: 100,
};

let currentEffect = DEFAULT_EFFECT;

const getScale = (step) => {
  const scaleControlValue = parseInt(scaleControlText.value, 10);
  const scaleControlValueCurrent = scaleControlValue + step;
  if (scaleControlValueCurrent > scaleValue.MAX) {
    return scaleValue.MAX;
  }
  if (scaleControlValueCurrent < scaleValue.MIN) {
    return scaleValue.MIN;
  }
  return scaleControlValueCurrent;
};

const setScale = (value) => {
  scaleControlText.value = `${value}%`;
  uploadFormImg.style.transform = `scale(${value / 100})`;
};

const resetScale = () => {
  setScale(scaleValue.MAX);
};

const sliderOptionsDefault = {
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

const sliderOptionsEffects = {
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

const changeEffectClassname = (item) => {
  uploadFormImg.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = item.value;
  uploadFormImg.classList.add(`effects__preview--${currentEffect}`);
};

const setEffectFilter = (filterName, value, unit) => {
  uploadFormImg.style.filter = `${filterName}(${value}${unit})`;
};

const updateSlider = (values, handle) => {
  const effectFilter = sliderOptionsEffects[currentEffect].filter;
  const effectUnit = sliderOptionsEffects[currentEffect].unit;

  effectsLevelValue.value = values[handle];
  setEffectFilter(effectFilter, effectsLevelValue.value, effectUnit);
};

const configureSlider = (options) => {
  sliderWrap.classList.remove('hidden');
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, {...sliderOptionsDefault, ...options});
    sliderElement.noUiSlider.on('update', updateSlider);
  } else {
    sliderElement.noUiSlider.updateOptions(options);
  }
  effectsLevelValue.value = options.start;
};

const destroySlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  uploadFormImg.style.filter = '';
  uploadFormImg.className = '';
  effectsLevelValue.value = '';
  destroySlider();
  sliderWrap.classList.add('hidden');
};

const effectsRadioClickHandler = (evt) => {
  if (evt.target.matches('[type=radio]')) {
    changeEffectClassname(evt.target);
    if (currentEffect !== DEFAULT_EFFECT) {
      configureSlider(sliderOptionsEffects[currentEffect].settings);
    } else {
      resetEffects();
    }
  }
};

const resetUploadEdit = () => {
  resetScale();
  resetEffects();
};

resetUploadEdit();

scaleControlSmaller.addEventListener('click', () => {
  setScale(getScale(-SCALE_STEP));
});
scaleControlBigger.addEventListener('click', () => {
  setScale(getScale(SCALE_STEP));
});

effectsList.addEventListener('click', effectsRadioClickHandler);


export {resetUploadEdit};
