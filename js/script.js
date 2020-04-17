let postLink = document.getElementById('postLink');
let input = document.getElementById('input');
let formContainer = document.getElementById('formContainer');
let linksContainer = document.getElementById('linksContainer');

let copyLinks = document.getElementsByClassName('copyLink');

postLink.addEventListener('submit', getLink);
// copyBtns.addEventListener('click', copyTxt);

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
      handleCopyBtns();
    } else {
      displayValidation();
    }
  } catch (error) {
    console.log(error);
  }
}

function displayLink(result) {
  linksContainer.innerHTML += `<div class="link"><span>${input.value}</span><span class="copyLink">https://rel.ink/${result.hashid}</span><input type="button" class="copyBtn" value="copy"/></div>`;
}

function displayValidation() {
  let p = document.createElement('p');
  p.innerHTML = 'Please add a link';
  p.classList.add('validate');
  formContainer.appendChild(p);
  input.classList.add('validate-form');
}

// function copyTxt(e) {
//   let copyLink = document.getElementsByName('copyLink');
//   let copyBtn = document.getElementsByName('copyBtn');
//   let range = document.createRange();
//   range.selectNodeContents(copyLink);
//   var selection = window.getSelection();
//   selection.removeAllRanges();
//   selection.addRange(range);

//   document.execCommand('copy');
//   // alert('text-copied');
//   copyBtn.value = 'copied!';
//   copyBtn.style.backgroundColor = 'hsl(257, 27%, 26%)';

//   console.log('clicked');
// }

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

// function copyText(button) {
//   console.log('clicked');
//   console.log(textEl);
//   console.log(button);
// }
