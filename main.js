import './scss/style.scss'
import ColorPicker from './js/color-picker.js';

const box = document.querySelector('#box');
const theColor = box.querySelector('#the-color');

const colorPicker = document.querySelector('color-picker');

const updateColor = () => {
  const clr = colorPicker.value;
  box.style.backgroundColor = clr;
  theColor.textContent = clr.toLowerCase();
}

window.addEventListener('load', async (e) => {
  await Promise.all([
    customElements.whenDefined('color-picker'),
  ]).then(() => {
    colorPicker.addEventListener('input', updateColor);
    updateColor();
  });
});