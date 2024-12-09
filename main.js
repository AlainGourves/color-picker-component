import './scss/style.scss'
import ColorPicker from './js/color-picker.js';

const app = document.querySelector('#app');
const box = document.querySelector('#box');
const theColor = box.querySelector('#the-color');

app.innerHTML = `
    <color-picker label="Background Color" value="#9aa60edc"></color-picker>
`

const colorPicker = app.querySelector('color-picker');

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