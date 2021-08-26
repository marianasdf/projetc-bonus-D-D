$(document).ready(function () {
  $('#slider').bxSlider({
    auto: true,
    controls: false,
  });
});

const listClasses = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];

const buscaSpell = async () => {
  const result = await fetch(`https://www.dnd5eapi.co/api/classes/${getTarget()}/spells`);
  return (await result.json()).results;
}
console.log(buscaSpell());

function getTarget (event) {
  const anchor = document.getElementsByClassName('dropdown-item');
  
}

const buscaClasses = async () => {
  const response = await fetch('https://www.dnd5eapi.co/api/classes');
  return (await response.json()).results;
}

const ul = document.getElementById("classes")

const montaListaDeClasses = async () => {
  const classes = await buscaClasses();
  classes.forEach((classe) => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.innerText = classe.name;
    anchor.className = 'dropdown-item'
    anchor.href = '#';
    li.appendChild(anchor);
    ul.appendChild(li);
  });
}

window.onload = async () => {
  await montaListaDeClasses();
  await buscaSpell();
}