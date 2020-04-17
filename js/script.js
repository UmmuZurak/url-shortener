let postLink = document.getElementById("postLink");
let input = document.getElementById("input");
let formContainer = document.getElementById("formContainer");
let linksContainer = document.getElementById("linksContainer");

let copyLink = document.getElementById("copyLink");
let copyBtn = document.getElementById("copyBtn");

let linksArray = [];
postLink.addEventListener("submit", getLink);
copyBtn.addEventListener("click", copyTxt);

async function getLink(e) {
  e.preventDefault();

  try {
    const res = await fetch("https://rel.ink/api/links/", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json"
      },
      body: JSON.stringify({ url: `${input.value}` })
    });

    const data = await res.json();

    if (input.value !== "") {
      displayLink(data);
      linksArray.push(input.value);
    } else {
      displayValidation();
    }
  } catch (error) {
    console.log(error);
  }
}

function displayLink(result) {
  linksContainer.innerHTML += `<div class="link"><span>${input.value}</span><span id="copyLink">https://rel.ink/${result.hashid}</span><input type="button" class="copyBtn" id="copyBtn" value="copy"/></div>`;
}

function displayValidation() {
  let p = document.createElement("p");
  p.innerHTML = "Please add a link";
  p.classList.add("validate");
  formContainer.appendChild(p);
  input.classList.add("validate-form");
}

function copyTxt(e) {
  var range = document.createRange();
  range.selectNodeContents(copyLink);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand("copy");
  alert("text-copied")
}
