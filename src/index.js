import marked from 'marked';
import example from './markdown-example.txt';
import './style.css';

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

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
  baseUrl: 0,
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

editor.focus();
editor.addEventListener('keyup', previewMarkdown);
window.addEventListener('load', displayExample);
