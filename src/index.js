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
  console.log('resize');
}

let clicked = false;

function slideStarted() {
  clicked = true;
}

function slideEnded() {
  clicked = false;
}

function changeRatio(e) {
  function resize(shift) {
    const shiftAbs = Math.abs(shift);
    if (shift < 0) {
      editor.style.width = `calc(100% - ${preview.offsetWidth}px - ${slider.offsetWidth}px - ${shiftAbs}%)`;
      preview.style.width = `calc(100% - ${editor.offsetWidth}px - ${slider.offsetWidth}px)`;
    } else {
      preview.style.width = `calc(100% - ${editor.offsetWidth}px - ${slider.offsetWidth}px - ${shiftAbs}%)`;
      editor.style.width = `calc(100% - ${preview.offsetWidth}px - ${slider.offsetWidth}px)`;
    }
  }

  if (clicked) {
    const shift = ((e.clientX - slider.offsetLeft) / document.body.offsetWidth) * 100;
    resize(shift);
  }
}

function textSelection(e) {
  if (clicked) e.preventDefault();
}

editor.focus();
editor.addEventListener('keyup', previewMarkdown);
window.addEventListener('load', displayExample);
window.addEventListener('resize', keepRatio);
slider.addEventListener('mousedown', slideStarted);
window.addEventListener('mouseup', slideEnded);
window.addEventListener('mousemove', e => changeRatio(e));
window.addEventListener('selectstart', e => textSelection(e));
