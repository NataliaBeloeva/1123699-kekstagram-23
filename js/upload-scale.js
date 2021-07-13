const SCALE_STEP = 25;

const scaleValues = {
  MIN: 25,
  MAX: 100,
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormImg = uploadForm.querySelector('.img-upload__preview img');

const scale = uploadForm.querySelector('.img-upload__scale');
const scaleZoomOut = scale.querySelector('.scale__control--smaller');
const scaleZoomIn = scale.querySelector('.scale__control--bigger');
const scaleTextValue = scale.querySelector('.scale__control--value');

const getScale = (step) => {
  const scaleValue = parseInt(scaleTextValue.value, 10);
  const scaleValueCurrent = scaleValue + step;
  if (scaleValueCurrent > scaleValues.MAX) {
    return scaleValues.MAX;
  }
  if (scaleValueCurrent < scaleValues.MIN) {
    return scaleValues.MIN;
  }
  return scaleValueCurrent;
};

const setScale = (value) => {
  scaleTextValue.value = `${value}%`;
  uploadFormImg.style.transform = `scale(${value / 100})`;
};

const resetScale = () => setScale(scaleValues.MAX);

const scaleZoomOutClickHandler = () => {
  setScale(getScale(-SCALE_STEP));
};

const scaleZoomInClickHandler = () => {
  setScale(getScale(SCALE_STEP));
};

scaleZoomOut.addEventListener('click', scaleZoomOutClickHandler);
scaleZoomIn.addEventListener('click', scaleZoomInClickHandler);

export {resetScale};
