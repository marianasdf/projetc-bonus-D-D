$(document).ready(function () {
  $('#slider').bxSlider({
    auto: true,
    controls: false,
  });
});

function buscaClasse () {
  const classe = document.querySelector('.dropdown-menu');
  classe.addEventListener('click', (event) => {
    buscaDataClass(event.target.innerText);
  })
}

const buscaDataClass = async (classe) => {
  const result = await fetch(`https://www.dnd5eapi.co/api/classes/${classe.toLowerCase()}`);
  const { proficiencies } = await result.json();
  const mainSection = document.querySelector('.content-main');
  const p = document.createElement('p');
  p.innerText = 'Proeficiencias';
  mainSection.appendChild(p);
  const ul = document.createElement('ul');
  proficiencies.forEach((element) => {
    const li = document.createElement('li');
    li.innerText = element.name;
    ul.appendChild(li);
  })
  mainSection.appendChild(ul);
}

function getTarget () {
  const anchor = document.querySelector('.dropdown-menu');
  anchor.addEventListener('click', (event) => {
    const mainSection = document.querySelector('.content-main');
    mainSection.innerHTML = '';
    const section = document.createElement('section');
    section.className = 'row col-md-8 offset-md-2';
    const p = document.createElement('p');
    p.className = 'title-page'
    p.innerText = event.target.innerText;
    const img = document.createElement('img');
    img.className = 'class-img float-end'
    img.src = `img/${event.target.innerText}.png`;
    section.appendChild(p);
    section.appendChild(img);
    mainSection.appendChild(section);
  })
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
  buscaClasse();
  getTarget();
}