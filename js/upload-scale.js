const SCALE_STEP = 25;

const scaleValue = {
  MIN: 25,
  MAX: 100,
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormImg = uploadForm.querySelector('.img-upload__preview img');

const scale = uploadForm.querySelector('.img-upload__scale');
const scaleControlSmaller = scale.querySelector('.scale__control--smaller');
const scaleControlBigger = scale.querySelector('.scale__control--bigger');
const scaleControlText = scale.querySelector('.scale__control--value');

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

scaleControlSmaller.addEventListener('click', () => {
  setScale(getScale(-SCALE_STEP));
});

scaleControlBigger.addEventListener('click', () => {
  setScale(getScale(SCALE_STEP));
});


export {resetScale};
