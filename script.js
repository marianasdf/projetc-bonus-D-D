$(document).ready(function(){
  $('#slider').bxSlider({
      auto: true,
      controls: false,
  });
});

const buscaClasses = async () => {
  const response = await fetch('https://www.dnd5eapi.co/api/classes');
  return (await response.json()).results;
}
buscaClasses();
const selectClasses = document.getElementById('classes');