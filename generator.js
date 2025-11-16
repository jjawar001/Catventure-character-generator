import {characterData} from "./data/charData.js"

const createBtn = document.getElementById('create-btn')
const charAncestry = document.getElementById('char-ancestry')
const charClass = document.getElementById('char-class')
const charBackground = document.getElementById('char-background')
const charImage = document.getElementById('character-image')

const hamburgerBtn = document.getElementById('hamburger-btn')
const navList = document.getElementById('nav-list')


const generateCharacter = () => {
  const randomNum = randomNumber(characterData.length)
  const generatedClass = characterData[randomNum].class
  const generatedAncestry = characterData[randomNum].ancestry
  const generatedBackground = characterData[randomNum].background
  const generatedImage = characterData[randomNum].image

  charClass.textContent = generatedClass
  charAncestry.textContent = generatedAncestry
  charBackground.textContent = generatedBackground

  charImage.innerHTML = `
    <img src=${generatedImage} alt="${generatedBackground} ${generatedClass} ${generatedAncestry}">
  `
}

const randomNumber = (max) => Math.floor(Math.random() * max);

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
createBtn.addEventListener('click', generateCharacter)

