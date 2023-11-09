window.addEventListener("DOMContentLoaded", main);

//globala variabler för h1 och för ett audio element
let message = document.createElement("h1");
let audio;

function main() {
  startGame();
}

function startGame() {
  //hämtar med nedstående klasser (till höger) och ger dessa variabelnamn i js
  const startH1 = document.querySelector(".startH1");
  const startH3 = document.querySelector(".startH3");
  const startH4 = document.querySelector(".startH4");
  const startP = document.querySelectorAll(".startP");

  //hämtar hem id för knapparna i scenerna
  const button1 = document.getElementById("item-1-b");
  const button2 = document.getElementById("item-2-b");
  const addAssetButton = document.getElementById("asset-b");
  const addAssetButton2 = document.getElementById("asset-b2");

  //gör så att knapparna inte syns på startsidan
  button1.style.display = "none";
  button2.style.display = "none";
  addAssetButton.style.display = "none";
  addAssetButton2.style.display = "none";

  startH1.textContent = start.h1; //hämtar hem alla textelementen i objektet för aktiv scen och visar dessa
  startH3.textContent = start.h3;
  startH4.textContent = start.h4;

  //hämtar hem alla startP element som finns i objektet genom att loopa igenom och öka med ett för varje gång det finns ett till element och skriver sedan ut dessa
  for (let i = 0; i < startP.length; i++) {
    startP[i].textContent = start["p" + (i + 1)];
  }

  //hämtar hem bodyn och ger den namnet body för att sedan byta bakgrundbilden till den som finns i objektet start
  const body = document.querySelector("body");
  body.style.backgroundImage = start.backgroundImage;

  //skapar variabelnamn till startGameButton
  const startGameButton = document.getElementById("startGameButton");

  //skapar en anonym funktion som anropar funktionen renderScene
  startGameButton.addEventListener("click", function () {
    //spelar musik på första scenen
    playAudio("src/sounds/startMusic.mp3");

    //hämtar alla element på startsidan
    const startRoomElements = document.querySelectorAll(".startRoom");

    //loopar igenom med alla element på startsidan medforeach och ta bort alla element
    startRoomElements.forEach(function (element) {
      element.remove();
    });
    //öppnar upp scen 1
    renderScene();
  });
}

//funktion som spelar och pausar ljud
function playAudio(audioSrc) {
  //befintligt ljud pausas om något redan spelas
  if (audio) {
    audio.pause();
    document.body.removeChild(audio);
  }
  //spelar upp ljudet från filen som valt i playAudio och skickar detta till domen
  audio = new Audio(audioSrc);
  audio.play();
  document.body.appendChild(audio);
}

function renderScene() {
  //skapar variabler som hämtar de föränderliga elementen i js så som text och knappar, bakgrundsbild
  const text = document.getElementById("text");
  const item1 = document.getElementById("item-1");
  const item2 = document.getElementById("item-2");
  const footer = document.getElementById("footer");
  const body = document.body;

  const button1 = document.getElementById("item-1-b");
  const button2 = document.getElementById("item-2-b");
  const addAssetButton = document.getElementById("asset-b");
  const addAssetButton2 = document.getElementById("asset-b2");
  const assetImage = document.getElementById("asset-image");
  const asset2Image = document.getElementById("asset-image2");
  const inventoryFooter = document.getElementById("inventory");

  setDisplayStyle(button1, button2, text, item1, item2, body, footer);

  const scene = scenes[activeSceneIndex]; //skapar variabel som hämtar hem den aktiva scenen spelaren befinner sig på i arrayen scenes

  text.textContent = scene.text; //hämtar hem alla textelementen i objektet för aktiv scen och visar dessa
  item1.textContent = scene.item1.text;
  item2.textContent = scene.item2.text;
  body.style.backgroundImage = scene.backgroundImage; //ändrar style för bodyn backgrundbild utefter aktivt element

  collectJoinAndDisplayAssets(
    addAssetButton,
    addAssetButton2,
    assetImage,
    asset2Image,
    inventoryFooter,
    scene
  );

  //när man klickar på item1 (vänster knapp) går man till scenen som objektets egenskap kallar på ett scenindex i arrayen för scener
  item1.onclick = function () {
    //pausar musiken
    playAudio("");
    goNextScene(scene.item1.nextSceneIndex);
  };

  item2.onclick = function () {
    playAudio("");
    // om aktivt scenindex är 2 (köket) och användaren INTE har nyckeln i sitt inventory
    getIntoBedroom(scene);
    checkInventoryForWinLose(body, button1, button2);
    checkForPhone();
  };

  showButton(button1, button2);
  powerButton();
  loseAndWin();
}

//kollar ifall användaren har nyckeln i sitt inventory, annars säger den åt hen att hämta den i scen 0.
function getIntoBedroom(scene) {
  if (activeSceneIndex === 2 && !inventory.includes(scenes[0].asset2)) {
    message.className = "messageN";
    message.textContent =
      "You need the key to go in there.. Hint: look around the porch.";
    text.style.display = "none";

    setTimeout(function () {
      document.body.removeChild(message);
      text.style.display = "block";
    }, 4000);
    document.body.appendChild(message);
  } else {
    //användaren har rätt objekt, gå till nästa scen
    goNextScene(scene.item2.nextSceneIndex);
  }
}

//kollar om användaren har telefonen i sitt inventory när den befinenr sig i sovrummet och har olika beteende beroende på det.
function checkForPhone() {
  if (activeSceneIndex === 3 && !inventory.includes(scenes[0].asset)) {
    message.className = "message";
    message.textContent =
      "You should really try to find the phone to be able to call the police.. Hint: Go to the porch.";
    text.style.display = "none";

    setTimeout(function () {
      document.body.removeChild(message);
    }, 8000);
    document.body.appendChild(message);
  } else if (activeSceneIndex === 3 && inventory.includes(scenes[0].asset)) {
    message.textContent =
      "Hello officer! There's a dead woman in the bedroom at 104 Crazy Street in Palm Springs, come quick, I'm afraid the killer is still in the house!";
    text.style.display = "none";

    setTimeout(function () {
      document.body.removeChild(message);
    }, 8000);
    document.body.appendChild(message);
  }
}

//kollar av inventory i den slutliga scenen om man väljer att attackera mördare.
function checkInventoryForWinLose(body, button1, button2) {
  //skapar ny h1tag och ger den klassen message
  message.className = "message";

  //om man är i scenen med index 5
  if (activeSceneIndex === 5) {
    //och det ligger en pistol och kulor i ens inventory
    if (
      inventory.includes("src/inventoryitems/gun.png") &&
      inventory.includes("src/inventoryitems/bullets.png")
    ) {
      message.textContent =
        "Victory!! You managed to attack the killer with your gun and bullets. You have won and neutralized the killer!";

      footer.style.display = "none";
      text.style.display = "none";
      button1.style.display = "none";
      button2.style.display = "none";

      document.body.appendChild(message);
      playAudio("src/sounds/gunshot.mp3");
    } else {
      message.textContent =
        "Loser!! You hadn't found the gun and the bullets, which allowed the killer to attack you first. You unfortunately died, but at least you went to heaven.";
      footer.style.display = "none";
      text.style.display = "none";
      button1.style.display = "none";
      button2.style.display = "none";
      document.body.style.backgroundImage = 'url("src/losegame.png")';

      document.body.appendChild(message);
      playAudio("src/sounds/fail.mp3");
    }
  }
}

function collectJoinAndDisplayAssets(
  addAssetButton,
  addAssetButton2,
  assetImage,
  asset2Image,
  inventoryFooter,
  scene
) {
  /* villkor som kollar här om asset och asset2 finns på objektet i scenen, gör den de så renderas den ut, om inte döljs den.
  kollar också om användare redan har lagt till den i inventory, har den de så döljs knappen.*/
  if (scene.asset && inventory.indexOf(scene.asset) === -1) {
    assetImage.src = scene.asset;
    addAssetButton.style.display = "block";
  } else {
    addAssetButton.style.display = "none";
  }

  if (scene.asset2 && inventory.indexOf(scene.asset2) === -1) {
    asset2Image.src = scene.asset2;
    addAssetButton2.style.display = "block";
  } else {
    addAssetButton2.style.display = "none";
  }

  //anonyma funktioner vad som händer när man klickar på först asset sen asset2
  addAssetButton.onclick = function () {
    if (inventory.indexOf(scene.asset) !== -1) {
      //asset finns redan i inventoy. vill inte lägga till igen
    } else {
      //asset finns inte så lägg till den med hjälp av .push()
      inventory.push(scene.asset);
      playAudio("src/sounds/pickup.mp3");
      //dölj asset knappen eftersom användare plockat upp den.
      addAssetButton.style.display = "none";

      //skapar element för bilden i scenens asset som läggs i inventory footern
      const img = document.createElement("img");
      img.className = "inventoryImg";
      img.src = scene.asset;
      img.alt = "Asset Image";
      inventoryFooter.appendChild(img);
    }
  };

  addAssetButton2.onclick = function () {
    if (inventory.indexOf(scene.asset2) !== -1) {
    } else {
      inventory.push(scene.asset2);
      playAudio("src/sounds/pickup.mp3");
      addAssetButton2.style.display = "none";
      const img2 = document.createElement("img");
      img2.className = "inventoryImg";
      img2.src = scene.asset2;
      img2.alt = "Asset Image";
      inventoryFooter.appendChild(img2);
    }
  };
}

//funktion som körs när man vinner eller förlorar -- FYLL PÅ HÄR ELSA
function loseAndWin() {
  const message = document.createElement("h1");
  if (activeSceneIndex === 6) {
    playAudio("src/sounds/cops.mp3");
    message.className = "messageN";
    message.textContent = "You either lose or win the game since you ran away.";

    footer.style.display = "none";
    text.style.display = "none";

    setTimeout(function () {
      document.body.removeChild(message);
      text.style.display = "block";
    }, 4000);
  }

  document.body.appendChild(message);
}

//tar hand om när knapparna för att förflytta sig mellan rum ska visas och inte
function showButton(button1, button2) {
  //visa inte vänster knapp på scen 0, 4 eller 6
  if (
    activeSceneIndex === 0 ||
    activeSceneIndex == 4 ||
    activeSceneIndex === 6
  ) {
    button1.style.display = "none";
  }

  //visa inte höger knapp på scen 4 eller 6
  if (activeSceneIndex === 4 || activeSceneIndex === 6) {
    button2.style.display = "none";
  }
}

//gör om det aktiva sceneindex till sidan man nu befinner sig, är man ex på scen med indexvärde 1 (vardagsrummet) och trycker på item två (högra knappen) så komemr man iom objektets egenskaper till scenen med indexvärde två (köket)
function goNextScene(sceneIndex) {
  activeSceneIndex = sceneIndex; //ändrar activesceneindex till sceneindexet som nu är aktivt
  renderScene(); //kör funktionen renderscene som hämtar hem allting för den aktiva scenen
}

//sätter stil för element
function setDisplayStyle(button1, button2, text, item1, item2, body, footer) {
  button1.style.display = "block";
  button2.style.display = "block";
  text.style.display = "block";
  item1.style.display = "block";
  item2.style.display = "block";
  body.style.display = "content";
  footer.style.display = "block";
}

//tar hand om vad som sker när man använder lampknappen i scen 4
function powerButton() {
  //skapar variabel för lampknappen
  const powerSwitchButton = document.getElementById("powerSwitch");
  if (activeSceneIndex === 4) {
    powerSwitchButton.style.display = "block"; //visa lampknapp om användaren är i det mörka badrummet
  } else {
    powerSwitchButton.style.display = "none"; //visa den inte ifall användaren är i något annat rum
  }

  //när man klickar på knappen så tänds rummet, dvs nästa sceneindex 5 renderas
  powerSwitchButton.addEventListener("click", function () {
    activeSceneIndex = 5;
    renderScene();
  });
}
