import {catSpells} from "./data/spellsdata.js"

const hamburgerBtn = document.getElementById('hamburger-btn')
const navList = document.getElementById('nav-list')

hamburgerBtn.addEventListener('click', ()=>{
  // button.setAttribute('aria-expanded', isOpen)
  // button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
  // const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true'
  // hamburgerBtn.setAttribute('aria-expanded', String(!expanded))
  navList.classList.toggle('active')
  if (navList.classList.contains('active')){
    hamburgerBtn.innerHTML = `<img class="close-nav-list" src="./images/close-img.png" alt="hamburger menu icon">`
  } else {
    hamburgerBtn.innerHTML = `<img src="./images/hamburger-menu.svg" alt="hamburger menu icon">`
  }
})


const tableBody = document.getElementById('table-body');
const spellListTable = document.getElementById('spell-list-table')
const spellDescription = document.getElementById('spell-description')
let ascending = true;
let chosenTh = 0;


function renderSpellTable(spellData) {
  let newHTML = ''
  let spellSchoolAbbrev = ''
  spellData.forEach(spell => {
    switch (spell.school) {
      case "Abjuration":
        spellSchoolAbbrev = 'Abju.'
        break
      
      case "Conjuration":
        spellSchoolAbbrev = 'Conj.'
        break
      
      case "Divination":
        spellSchoolAbbrev = 'Divi.'
        break
      
      case "Enchantment":
        spellSchoolAbbrev = 'Ench.'
        break
      
      case "Evocation":
        spellSchoolAbbrev = 'Evoc.'
        break
      
      case "Illusion":
        spellSchoolAbbrev = 'Illu.'
        break
      
      case "Necromancy":
        spellSchoolAbbrev = 'Necr.'
        break
      
      case "Transmutation":
        spellSchoolAbbrev = 'Tran.'
        break      
    }
    newHTML += `<tr id="${spell.id}">
                <td>${spell.name}</td>
                <td>${spell.level}</td>
                <td>${spellSchoolAbbrev}</td>
                <td>${spell.components}</td>
              </tr>`
  })
  tableBody.insertAdjacentHTML('beforeEnd', newHTML)
  sortTable(0) 
  
// Dynamically render  the first spell sorted by letter by default when page loads
  const rowsNode = tableBody.querySelectorAll('tr')
  const rowsArray = [...rowsNode]
  
  const spell = catSpells.filter(item => {
    return item.id === rowsArray[0].id
  })

  spellDescription.innerHTML = ''
  const spellDescriptionText = `
      <h2 class="center">SPELL DESCRIPTION</h2>
      <h3 class="styled-font bold center">${spell[0].name}</h3>
      <p><span class="bold">Level:</span> ${spell[0].level}</p>
      <p><span class="bold">School:</span> ${spell[0].school}</p>
      <p><span class="bold">Casting Time:</span> ${spell[0].castingTime}</p>
      <p><span class="bold">Range:</span> ${spell[0].range}</p>
      <p><span class="bold">Duration:</span> ${spell[0].duration}</p>
      <p><span class="bold">Components:</span> ${spell[0].components}</p>
      <p><span class="bold">Description:</span> ${spell[0].description}</p>
      <p><span class="bold">Effect:</span> ${spell[0].effect}</p>`
  spellDescription.insertAdjacentHTML('beforeEnd', spellDescriptionText)  
}

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


renderSpellTable(catSpells)


// CHOOSE WHICH SPELL TO DISPLAY BY CLICKING ON SPELL IN TABLE
tableBody.addEventListener('click', function(e) {
  const row = e.target.closest('tr')
  if (row) {
    catSpells.forEach((spell) => {
      if (row.id === spell.id) {
        spellDescription.innerHTML = ''
        const spellDescriptionText = `
            <h2 class="center">SPELL DESCRIPTION</h2>
            <h3 class="styled-font bold center">${spell.name}</h3>
            <p><span class="bold">Level:</span> ${spell.level}</p>
            <p><span class="bold">School:</span> ${spell.school}</p>
            <p><span class="bold">Casting Time:</span> ${spell.castingTime}</p>
            <p><span class="bold">Range:</span> ${spell.range}</p>
            <p><span class="bold">Duration:</span> ${spell.duration}</p>
            <p><span class="bold">Components:</span> ${spell.components}</p>
            <p><span class="bold">Description:</span> ${spell.description}</p>
            <p><span class="bold">Effect:</span> ${spell.effect}</p>`
        spellDescription.insertAdjacentHTML('beforeEnd', spellDescriptionText)
      }
    })
  }
})

// DETERMINE WHICH TH CATEGORY WAS CLICKED AND CALL SORTTABLE
document.querySelector('thead').addEventListener('click', (e) => {
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

// REMOVE HIGHLIGHT and remove trianges FROM ALL TH'S
function removeThHighlightAndTriangle(){
  const th = document.querySelectorAll('th')
  th.forEach(cell => cell.classList.remove('highlight'))
  th.forEach(cell => cell.textContent = cell.textContent.replace('▼', ''))
  th.forEach(cell => cell.textContent = cell.textContent.replace('▲', ''))  
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

  const input = document.getElementById('myInput')
  input.addEventListener('keyup', searchForSpells)