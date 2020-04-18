let postLink = document.getElementById('postLink');
let input = document.getElementById('input');
let formContainer = document.getElementById('formContainer');
let linksContainer = document.getElementById('linksContainer');
let linksArray = localStorage.getItem('linksList')
  ? JSON.parse(localStorage.getItem('linksList'))
  : [];

localStorage.setItem('linksList', JSON.stringify(linksArray));
const links = JSON.parse(localStorage.getItem('linksList'));

postLink.addEventListener('submit', getLink);

async function getLink(e) {
  e.preventDefault();

  try {
    const res = await fetch('https://rel.ink/api/links/', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ url: `${input.value}` }),
    });

    const data = await res.json();

    if (input.value !== '') {
      displayLink(data);
      resetInput();
      handleCopyBtns();
    } else {
      displayValidation();
    }
  } catch (error) {
    console.log(error);
  }
}

function displayLink(result) {
  linksContainer.innerHTML += `<div class="link">
                              <span>${input.value}</span>
                              <span class="copyLink">https://rel.ink/${result.hashid}</span>
                              <input type="button" class="copyBtn" value="copy"/>
                              </div>`;

  linksArray.push({ input: input.value, hashcode: result.hashid });
  localStorage.setItem('linksList', JSON.stringify(linksArray));
}

function displayValidation() {
  let p = document.createElement('p');
  p.innerHTML = 'Please add a link';
  p.classList.add('validate');
  formContainer.appendChild(p);
  input.classList.add('validate-form');
}

function handleCopyBtns() {
  let copyBtns = document.getElementsByClassName('copyBtn');
  for (let i = 0; i < copyBtns.length; i++) {
    let button = copyBtns[i];
    button.addEventListener('click', function (e) {
      let text = button.previousElementSibling;
      let range = document.createRange();
      range.selectNodeContents(text);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('copy');
      button.value = 'copied!';
      button.style.backgroundColor = 'hsl(257, 27%, 26%)';
    });
  }
}

function resetInput() {
  input.value = '';
}

links.forEach((link) => displayStoredLinks(link));

function displayStoredLinks(item) {
  linksContainer.innerHTML += `<div class="link">
                              <span>${item.input}</span>
                              <span class="copyLink">https://rel.ink/${item.hashcode}</span>
                              <input type="button" class="copyBtn" value="copy"/>
                              </div>`;
  handleCopyBtns();
}
