const hamburger = document.getElementById('hamburger');
const hamburgerMenu = document.getElementById('bars-menu');

hamburger.addEventListener('click', displayMenu);

function displayMenu() {
  hamburgerMenu.classList.toggle('hide');
}
