import {catSpells} from "./data/spellsdata.js"

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


const tableBody = document.getElementById('table-body');
const spellListTable = document.getElementById('spell-list-table');
const spellDescription = document.getElementById('spell-description');


function renderSpellTable(spellData) {
  let newHTML = ''
  spellData.forEach(spell => {
      newHTML += `<tr id="${spell.id}">
                <td>${spell.name}</td>
                <td>${spell.level}</td>
                <td>${spell.school}</td>
                <td>${spell.components}</td>
              </tr>`
  })

  tableBody.insertAdjacentHTML('beforeEnd', newHTML)
}

renderSpellTable(catSpells)

spellListTable.addEventListener('click', function(e) {
  const row = e.target.closest('tr')
  if (row) {
    catSpells.forEach((spell) => {
      if (row.id === spell.id) {
        spellDescription.innerHTML = ''
        const spellDescriptionText = `
            <h2 class="medieval-font center">SPELL DESCRIPTION</h2>
            <h3 class="bold center">${spell.name}</h3>
            <p><span class="bold">Level:</span> ${spell.level}</p>
            <p><span class="bold">School:</span> ${spell.school}</p>
            <p><span class="bold">Casting Time:</span> ${spell.castingTime}</p>
            <p><span class="bold">Range:</span> ${spell.range}</p>
            <p><span class="bold">Duration:</span> ${spell.duration}</p>
            <p><span class="bold">Components:</span> ${spell.components}</p>
            <p><span class="bold">Description:</span> ${spell.description}</p>
            <p><span class="bold">Effect:</span>${spell.effect}</p>`
        spellDescription.insertAdjacentHTML('beforeEnd', spellDescriptionText)
      }
    })
  }
})
