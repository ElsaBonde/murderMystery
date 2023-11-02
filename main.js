window.addEventListener("DOMContentLoaded", main);

function main() {
  renderScene();
}

function renderScene() { //skapar variabler som hämtar de föränderliga elementen i js så som text och knappar, bakgrundsbild
  const text = document.getElementById("text");
  const item1 = document.getElementById("item-1");
  const item2 = document.getElementById("item-2");
  const body = document.getElementById("body");

  const scene = scenes[activeSceneIndex]; //skapar variabel som hämtar hem den aktiva scenen spelaren befinner sig på i arrayen scenes

  text.textContent = scene.text; //hämtar hem alla textelementen i objektet för aktiv scen och visar dessa
  item1.textContent = scene.item1.text;
  item2.textContent = scene.item2.text;
  body.style.backgroundImage = scene.backgroundImage; //ändrar style för bodyn backgrundbild utefter aktivt element
  

  //när man klickar på item1 (vänster knapp) går man till scenen som objektets egenskap kallart på i index i arrayen för scener
  item1.onclick = function () {
    goNextScene(scene.item1.nextSceneIndex);
  };
  item2.onclick = function () {
    goNextScene(scene.item2.nextSceneIndex);
  };
}

//gör om det aktiva sceneindex till sidan man nu befinner sig, är man ex på scen med indexvärde 1 (vardagsrummet) och trycker på item två (högra knappen) så komemr man iom objektets egenskaper till scenen med indexvärde två (köket)
function goNextScene(sceneIndex) {
  activeSceneIndex = sceneIndex; //ändrar activesceneindex till sceneindexet som nu är aktivt
  renderScene(); //kör funktionen renderscene som hämtar hem allting för den aktiva scenen
}
