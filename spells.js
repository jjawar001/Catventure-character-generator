import {catSpells} from "./data/spellsdata.js"

const hamburgerBtn = document.getElementById('hamburger-btn')
const navList = document.getElementById('nav-list')
const tableBody = document.getElementById('table-body');
const spellListTable = document.getElementById('spell-list-table')
const spellDescription = document.getElementById('spell-description')
const input = document.getElementById('myInput')
const thead = document.querySelector("thead");

let ascending = true;
let chosenTh = 0;

// ----------------------------
// Utility data
// ----------------------------
const schoolAbbrev = {
  Abjuration: "Abju.",
  Conjuration: "Conj.",
  Divination: "Divi.",
  Enchantment: "Ench.",
  Evocation: "Evoc.",
  Illusion: "Illu.",
  Necromancy: "Necr.",
  Transmutation: "Tran."
};

// ----------------------------
// Utility functions
// ----------------------------

function sortTable(categoryIndex) {
  const rowsNode = tableBody.querySelectorAll('tr')
  const rowsArray = [...rowsNode]

  rowsArray.sort((rowA, rowB) => {
    let cellA = rowA.cells[categoryIndex].textContent 
    let cellB = rowB.cells[categoryIndex].textContent 
    return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA)
    // return cellB.localeCompare(cellA)
  })

  rowsArray.forEach((row)=>{
    tableBody.appendChild(row)
  })
}
const removeThHighlightAndTriangle = () => {
  const th = document.querySelectorAll('th')
  th.forEach(cell =>{
    cell.classList.remove('highlight')
    cell.textContent = cell.textContent.replace('▼', '')
    cell => cell.textContent = cell.textContent.replace('▲', '')
  })
}
function searchForSpells() {
  const input = document.getElementById('myInput')
  const filter = input.value.toUpperCase();
  const tr = tableBody.getElementsByTagName('tr')
  // loop through all trs and hide those that don't match the search query
  for (let i = 0; i < tr.length; i++) {
    console.log(tr[i].textContent)
    if (tr) {
      let textValue = tr[i].textContent || tr[i].innerText
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display="table-row"
      } else {
        tr[i].style.display="none"
      }
    }
  }
}
const renderSpellDescription = (spell) => {
  spellDescription.innerHTML = `
    <h2 class="center">SPELL DESCRIPTION</h2>
    <h3 class="styled-font bold center">${spell.name}</h3>
    <p><span class="bold">Level:</span> ${spell.level}</p>
    <p><span class="bold">School:</span> ${spell.school}</p>
    <p><span class="bold">Casting Time:</span> ${spell.castingTime}</p>
    <p><span class="bold">Range:</span> ${spell.range}</p>
    <p><span class="bold">Duration:</span> ${spell.duration}</p>
    <p><span class="bold">Components:</span> ${spell.components}</p>
    <p><span class="bold">Description:</span> ${spell.description}</p>
    <p><span class="bold">Effect:</span> ${spell.effect}</p>
  `
}
const createSpellRow = (spell) => {
  const abbrev = schoolAbbrev[spell.school] || spell.school;
  return `
    <tr id="${spell.id}">
      <td>${spell.name}</td>
      <td>${spell.level}</td>
      <td>${abbrev}</td>
      <td>${spell.components}</td>
    </tr>
  `;
}

// ----------------------------
// Rendering functions
// ----------------------------
const renderSpellTable = (spellData) => {
  const rowsHTML = spellData.map(createSpellRow).join("")
  tableBody.insertAdjacentHTML('beforeEnd', rowsHTML)
  sortTable(0) 
  
  // Render descirption of first spell in table upon page load
  const firstSpellId = tableBody.querySelector("tr")?.id
  console.log(firstSpellId)
        // ^^^ tableBody.querySelector("tr")?.id safely gets the ID of the first table row, if one exists — otherwise, it just gives undefined instead of breaking your script. 
  const firstSpell = spellData.find((spell) => spell.id === firstSpellId);
  if (firstSpell) renderSpellDescription(firstSpell);
}

// ----------------------------
// Event listeners
// ----------------------------

hamburgerBtn.addEventListener('click', ()=>{
  navList.classList.toggle('active')
  if (navList.classList.contains('active')){
    hamburgerBtn.innerHTML = `<img class="close-nav-list" src="./images/close-img.png" alt="hamburger menu icon">`
  } else {
    hamburgerBtn.innerHTML = `<img src="./images/hamburger-menu.svg" alt="hamburger menu icon">`
  }
})

tableBody.addEventListener('click', (e) => {
  const row = e.target.closest('tr')
  if (!row) return;
  const spell = catSpells.find((spell) =>spell.id === row.id)
  if (spell) renderSpellDescription(spell);
})

thead.addEventListener('click', (e) => {
      if(e.target.tagName ===  'TH') {
        removeThHighlightAndTriangle()

        switch (e.target.id){
          case 'col-name':
            ascending = (ascending===false || chosenTh !== 0) ? true : false
            e.target.textContent = (ascending) ? "Name ▼" : "Name ▲"
            chosenTh = 0
            sortTable(0)
            e.target.classList.add('highlight')
            break

          case 'col-level':
            ascending = (ascending===false || chosenTh !== 1) ? true : false
            e.target.textContent = (ascending) ? "Level ▼" : "Level ▲"
            chosenTh = 1
            sortTable(1)
            e.target.classList.add('highlight')
            break

          case 'col-school':
            ascending = (ascending===false || chosenTh !== 2) ? true : false
            e.target.textContent = (ascending) ? "School ▼" : "School ▲"
            chosenTh = 2
            sortTable(2)
            e.target.classList.add('highlight')
            break

          case 'col-components':
            ascending = (ascending===false || chosenTh !== 3) ? true : false
            e.target.textContent = (ascending) ? "Components ▼" : "Components ▲"
            chosenTh = 3
            sortTable(3)
            e.target.classList.add('highlight')
            break

          default:
            ascending = (ascending===false || chosenTh !== 4) ? true : false
            e.target.textContent = (ascending) ? "Name ▼" : "Name ▲"
            chosenTh = 0
            sortTable(0)
            e.target.classList.add('highlight')
        }   
      }
})

input.addEventListener('keyup', searchForSpells)

// ----------------------------
// Initialize
// ----------------------------
renderSpellTable(catSpells)
