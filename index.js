const hamburgerBtn = document.getElementById('hamburger-btn')
const navList = document.getElementById('nav-list')

hamburgerBtn.addEventListener('click', ()=>{
  // button.setAttribute('aria-expanded', isOpen);
  // button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  // const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
  // hamburgerBtn.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('active');
  if (navList.classList.contains('active')){
    hamburgerBtn.innerHTML = `<img class="close-nav-list" src="./images/close-img.png" alt="hamburger menu icon">`
  } else {
    hamburgerBtn.innerHTML = `<img src="./images/hamburger-menu.svg" alt="hamburger menu icon">`
  }
})

function updateCopyrightDate() {
  const copyrightDate = document.getElementById('copyright-date')
  copyrightDate.textContent = new Date().getFullYear()
}
updateCopyrightDate()
