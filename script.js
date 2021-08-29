$(document).ready(function () {
  $('#slider').bxSlider({
    auto: true,
    controls: false,
  });
});


function buscaClasse() {
  const classe = document.querySelector('.dropdown-menu');
  classe.addEventListener('click', (event) => {
    buscaDataClass(event.target.innerText);
  })
}

const buscaDataClass = async (classe) => {
  const result = await fetch(`https://www.dnd5eapi.co/api/classes/${classe.toLowerCase()}`);
  const { proficiencies, subclasses } = await result.json();
  const rowId = document.getElementById('row-id')
  const divProeficiencia = document.createElement('div');
  divProeficiencia.className = 'col-sm'
  const divSubClasses = document.createElement('div')
  divSubClasses.className = 'col-sm'
  divProeficiencia.innerText = 'Proeficiencias';
  divSubClasses.innerText = 'Subclasses'
  rowId.appendChild(divProeficiencia);
  rowId.appendChild(divSubClasses);
  const ul = document.createElement('ul');
  const ulSubClasses = document.createElement('ul');
  proficiencies.forEach((element) => {
    const li = document.createElement('li');
    li.innerText = element.name;
    ul.appendChild(li);
  })
  subclasses.forEach((element) => {
    const li = document.createElement('li');
    li.innerText = element.name;
    ulSubClasses.appendChild(li);
  })
  divSubClasses.appendChild(ulSubClasses);
  divProeficiencia.appendChild(ul);
}

function getTarget() {
  const anchor = document.querySelector('.dropdown-menu');
  anchor.addEventListener('click', (event) => {
    const classeDescricao = document.getElementById('row-id')
    classeDescricao.innerHTML = '';
    classeDescricao.classList.remove('d-none')
    document.getElementById('container-conteudo').classList.add('d-none')
    const section = document.createElement('div');
    section.className = 'col-sm'
    const p = document.createElement('p');
    p.className = 'title-page'
    p.innerText = event.target.innerText;
    const img = document.createElement('img');
    img.className = 'class-img'
    img.src = `img/${event.target.innerText}.png`;
    section.appendChild(p);
    section.appendChild(img);
    classeDescricao.appendChild(section);
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