import marked from 'marked';
import example from './markdown-example.txt';

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

function previewMarkdown() {
  const text = editor.value;
  preview.innerHTML = marked(text);
}

function onLoad() {
  editor.value = example;
  previewMarkdown();
}

editor.focus();
editor.addEventListener('keyup', previewMarkdown);
window.addEventListener('load', onLoad);
