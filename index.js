import {characterData} from "./charData.js"

const createBtn = document.getElementById('create-btn')
const charAncestry = document.getElementById('char-ancestry')
const charClass = document.getElementById('char-class')
const charBackground = document.getElementById('char-background')
const charImage = document.getElementById('character-image')

createBtn.addEventListener('click', generateCharacter)

function generateCharacter() {
  let randomNum = randomNumber(characterData.length)
  let generatedClass = characterData[randomNum].class
  let generatedAncestry = characterData[randomNum].ancestry
  let generatedBackground = characterData[randomNum].background
  let generatedImage = characterData[randomNum].image
  charClass.textContent = generatedClass
  charAncestry.textContent = generatedAncestry
  charBackground.textContent = generatedBackground
  charImage.innerHTML = `
    <img src=${generatedImage} alt="${generatedBackground} ${generatedClass} ${generatedAncestry}">
  `
}

function randomNumber(param1){
  return Math.floor(Math.random() * param1)
}

