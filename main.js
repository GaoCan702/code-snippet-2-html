import juice from 'juice';
import './main.css'

import hljs from 'highlight.js';


let output = "";


document.addEventListener('DOMContentLoaded', async (event) => {
  // 初始化 highlight.js
  hljs.highlightAll();
  // 获取 DOM 元素
  const codeInput = document.getElementById('codeInput');
  const languageSelector = document.getElementById('languageSelector');
  const themeSelector = document.getElementById('themeSelector');
  const highlightTheme = document.getElementById('highlightTheme');

  // 动态添加语言选项
  hljs.listLanguages().forEach((lang) => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    if (lang == 'javascript') {
      option.selected = true
    }
    languageSelector.appendChild(option);
    reload(document.querySelector('input[name="mode"]:checked').value);
  });


  themeSelector.addEventListener('change', () => {
    // 应用所选主题的逻辑
    // 这可能需要动态改变页面上的某个 CSS 链接或类名
    const selectedTheme = themeSelector.value;
    highlightTheme.href = `/highlightjs-styles/${selectedTheme}.css`;
  });


  codeInput.addEventListener('input', () => {
    reload(document.querySelector('input[name="mode"]:checked').value);
  });
});

function reload(mode) {
  if (codeInput.value.trim() == "") {
    return;
  }
  const language = languageSelector.value || 'plaintext';
  const highlightedCode = hljs.highlight(codeInput.value, { language }).value;
  output = juice(`<style>${getThemeCssText()}</style> <pre><code>${highlightedCode}</code></pre>`);

  const outputArea = document.getElementById('outputArea');
  if (mode === 'preview') {
    outputArea.innerHTML = output;
  } else {
    outputArea.textContent = output;
  }

}



document.querySelectorAll('input[name="mode"]').forEach(input => {
  input.addEventListener('change', () => reload(document.querySelector('input[name="mode"]:checked').value));
});


function getThemeCssText() {
  const sheet = document.getElementById('highlightTheme').sheet;
  let cssText = '';
  for (let i = 0; i < sheet.cssRules.length; i++) {
    cssText += sheet.cssRules[i].cssText + '\n';
  }
  return cssText;
}


document.getElementById('copyButton').addEventListener('click', function () {
  navigator.clipboard.writeText(output).then(() => {
    // 可选：显示一个通知或更改按钮状态，表明已复制内容
  }).catch(err => {
    console.error('Error in copying text: ', err);
  });
});




