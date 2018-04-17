import marked from 'marked';
import example from './markdown-example.txt';
import './style.css';

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const slider = document.getElementById('slider');

const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a
    target="_blank"
    href="${href}"
    ${title ? `title="${title}"` : ''}
  >${text}</a>`;

const markdownOptions = {
  headerIds: false,
  gfm: true,
  breaks: true,
  renderer,
};

function previewMarkdown() {
  const text = editor.value;
  preview.innerHTML = marked(text, markdownOptions);
}

function displayExample() {
  editor.value = example;
  previewMarkdown();
}

function keepRatio() {
  const landscape = window.matchMedia('(orientation: landscape)').matches;
  if (landscape) {
    document.documentElement.style.setProperty('--slider-width', '10px');
    document.documentElement.style.setProperty('--slider-height', '100%');
    document.documentElement.style.setProperty('--editor-width', '50%');
    document.documentElement.style.setProperty('--editor-height', '100%');
    document.documentElement.style.setProperty('--preview-width', '50%');
    document.documentElement.style.setProperty('--preview-height', '100%');
  } else {
    document.documentElement.style.setProperty('--slider-width', '100%');
    document.documentElement.style.setProperty('--slider-height', '10px');
    document.documentElement.style.setProperty('--editor-width', '100%');
    document.documentElement.style.setProperty('--editor-height', '50%');
    document.documentElement.style.setProperty('--preview-width', '100%');
    document.documentElement.style.setProperty('--preview-height', '50%');
  }
}

let clicked = false;
let startX;
let startY;

function slideStarted(e) {
  clicked = true;
  startX = e.clientX;
  startY = e.clientY;
}

function slideEnded() {
  clicked = false;
}

function resize(shiftX, shiftY) {
  const landscape = window.matchMedia('(orientation: landscape)').matches;
  if (landscape) {
    const width = window.getComputedStyle(document.documentElement).getPropertyValue('--editor-width');
    const newWidth = `${parseFloat(width) + shiftX}%`;
    document.documentElement.style.setProperty('--editor-width', newWidth);
  } else {
    const height = window.getComputedStyle(document.documentElement).getPropertyValue('--editor-height');
    const newHeight = `${parseFloat(height) + shiftY}%`;
    document.documentElement.style.setProperty('--editor-height', newHeight);
  }
}

function changeRatio(e) {
  if (clicked) {
    const shiftX = ((e.clientX - startX) / document.body.offsetWidth) * 100;
    const shiftY = ((e.clientY - startY) / document.body.offsetHeight) * 100;
    resize(shiftX, shiftY);
    startX = e.clientX;
    startY = e.clientY;
  }
}

function textSelection(e) {
  if (clicked) e.preventDefault();
}

editor.focus();
editor.addEventListener('keyup', previewMarkdown);
window.addEventListener('load', displayExample);
window.addEventListener('resize', keepRatio);
slider.addEventListener('mousedown', e => slideStarted(e));
window.addEventListener('mouseup', slideEnded);
window.addEventListener('mousemove', e => changeRatio(e));
window.addEventListener('selectstart', e => textSelection(e));
