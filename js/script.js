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
  let regex1 = /^[h]\w*\:\/\/.*\..*$/;
  let regex2 = /^\w.*\.(\w{2,3})$/;
  let regex3 = /\w*/;
  let newUrl;

  if (regex2.test(input.value) === true) {
    newUrl = `http://${input.value}`;
  } else {
    newUrl = input.value;
  }

  try {
    const res = await fetch('https://rel.ink/api/links/', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ url: `${newUrl}` }),
    });

    const data = await res.json();

    if (data.hashid !== undefined) {
      displayLink(data);
      resetInput();
      handleCopyBtns();
    } else if (input.value === '') {
      displayValidation(
        'p',
        'Please add a link',
        'validate-input',
        'validate-form'
      );
    } else if (regex3.test(input.value) === true) {
      displayValidation(
        'p',
        'Please add a valid link',
        'validate-url',
        'validate-form2'
      );
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

function displayValidation(el, text, pClass, formClass) {
  let p = document.createElement(el);
  p.innerHTML = text;
  p.classList.add(pClass);
  formContainer.appendChild(p);
  input.classList.add(formClass);

  setTimeout(() => {
    p.style.display = 'none';
    input.classList.remove(formClass);
  }, 5000);
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
      button.style.backgroundColor = 'var(--dark-violet)';

      setTimeout(() => {
        button.value = 'copy';
        button.style.backgroundColor = 'var(--cyan)';
      }, 2000);
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
