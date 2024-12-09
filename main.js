import './scss/style.scss'
import ColorPicker from './js/color-picker.js';

const box = document.querySelector('#box');
const theColor = box.querySelector('#the-color');

const colorPicker = document.querySelector('color-picker');

const updateColor = (clr) => {
  box.style.backgroundColor = clr;
  theColor.textContent = clr.toLowerCase();

}

colorPicker.addEventListener('input', e => {
  updateColor(e.target.value);
});

window.addEventListener('load', e => {
  updateColor(colorPicker.value);
});