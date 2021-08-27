$(document).ready(function () {
  $('#slider').bxSlider({
    auto: true,
    controls: false,
  });
});

const buscaSpell = async () => {
  const result = await fetch(`https://www.dnd5eapi.co/api/classes/${getTarget()}/spells`);
  return (await result.json()).results;
}


function getTarget () {
  const anchor = document.querySelector('.dropdown-menu');
  anchor.addEventListener('click', (event) => {
    const mainSection = document.querySelector('.content-main');
    mainSection.innerHTML = '';
    const section = document.createElement('section');
    section.className = 'row col-md-8 offset-md-2';
    const p = document.createElement('p');
    p.innerText = event.target.innerText;
    const img = document.createElement('img');
    img.src = `img/${event.target.innerText}.png`;
    section.appendChild(img);
    section.appendChild(p);
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
  await buscaSpell();
  getTarget();
}