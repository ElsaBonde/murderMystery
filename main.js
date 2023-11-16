window.addEventListener("DOMContentLoaded", function() {
  //hämtar värdet för sparat sceneindex
  const savedSceneIndex = localStorage.getItem("activeSceneIndex");

  //om det sparade scenindexet har ett värde så 
  if (savedSceneIndex !== null) {
    //ges activesceneindex det värdet
    activeSceneIndex = parseInt(savedSceneIndex);
    //scenen körs sedan och gömmer startspelselementen
    renderInventory();
    renderScene();
    hideStartGameElements();
    
  } else { //ladda startscenen om inget finns sparat i local storage
    startGame();
  }
});

/**
 * @type {HTMLHeadingElement} Is a h1 text element
 */
let message = document.createElement("h1");

/**
 * @type {HTMLButtonElement} Defines a button element
 */
let playAgain = document.createElement("button");
playAgain.textContent = "Play Again?";

/**
 * @type {string} String that will call for an mp3 file later on
 */
let audio;

function hideStartGameElements() {
  const startGameButton = document.getElementById("startGameButton");
  const textBox = document.querySelector(".textBox");
  
  startGameButton.style.display = "none";
  textBox.style.display = "none";
}

/**
 * The first function to run calls the startGame function.
 * */
function main() {
  startGame();
}

/**
 * First declares all existing dom elements from index.html and hides the
 * elements that should only be displayed when the scenes array runs.
 * Also creates a click event for the start button which removes all elements
 * on the start page and calls the function to show the first scene in "scenes".
 * */
function startGame() {
  getElementsToStartGame();

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

/**
 * Retrieves necessary elements to initialize the game's start interface,
 * sets initial display styles, and populates with content.
 */
function getElementsToStartGame() {
  const startH1 = document.querySelector(".startH1");
  const startH3 = document.querySelector(".startH3");
  const startH4 = document.querySelector(".startH4");
  const startP = document.querySelectorAll(".startP");

  //hämtar hem id för knapparna i scenerna
  const leftButton = document.getElementById("leftButton");
  const rightButton = document.getElementById("rightButton");
  const addAssetButton = document.getElementById("asset-b");
  const addAssetButton2 = document.getElementById("asset-b2");

  //gör så att knapparna inte syns på startsidan
  leftButton.style.display = "none";
  rightButton.style.display = "none";
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
}

/**
 * Creates the variable that retrieves different sounds and displays it in the DOM.
 * Checks through an if statement if a sound is already playing when a new sound arrives.
 * If so, the first sound is paused and removed from the DOM.
 *
 * @param {HTMLAudioElement} audioSrc url link that fetches the music
 */
function playAudio(audioSrc) {
  //funktion som spelar och pausar ljud
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

/**
 * Gets elements for the scenes and declares them in Javascript.
 * Creates click events for the button on the right and left and
 * calls many functions required for the game to function properly.
 * */
function renderScene() {
  //skapar variabler som hämtar de föränderliga elementen i js så som text och knappar, bakgrundsbild
  const text = document.getElementById("text");
  const buttonLeft = document.getElementById("leftButtonText");
  const buttonRight = document.getElementById("rightButtonText");
  const footer = document.getElementById("footer");
  const body = document.body;

  const leftButton = document.getElementById("leftButton");
  const rightButton = document.getElementById("rightButton");
  const addAssetButton = document.getElementById("asset-b");
  const addAssetButton2 = document.getElementById("asset-b2");
  const assetImage = document.getElementById("asset-image");
  const asset2Image = document.getElementById("asset-image2");

  setDisplayStyle(
    leftButton,
    rightButton,
    text,
    buttonLeft,
    buttonRight,
    body,
    footer
  );

  const scene = scenes[activeSceneIndex]; //skapar variabel som hämtar hem den aktiva scenen spelaren befinner sig på i arrayen scenes

  text.textContent = scene.text; //hämtar hem alla textelementen i objektet för aktiv scen och visar dessa
  buttonLeft.textContent = scene.buttonLeft.text;
  buttonRight.textContent = scene.buttonRight.text;
  body.style.backgroundImage = scene.backgroundImage; //ändrar style för bodyn backgrundbild utefter aktivt element

  manageSceneAssetsAndButtons(
    addAssetButton,
    addAssetButton2,
    assetImage,
    asset2Image,
    scene
  );

  //när man klickar på buttonLeft (vänster knapp) går man till scenen som objektets egenskap kallar på ett scenindex i arrayen för scener
  buttonLeft.onclick = function () {
    //pausar musiken
    playAudio("");
    goNextScene(scene.buttonLeft.nextSceneIndex);
  };

  buttonRight.onclick = function () {
    playAudio("");
    // om aktivt scenindex är 2 (köket) och användaren INTE har nyckeln i sitt inventory
    getIntoBedroom(scene);
    checkInventoryForWinLose();
    checkForPhone();
  };

  showButton(leftButton, rightButton);
  powerButton();
  loseAndWin();
}

/**
 * Checks if the user is in the kitchen and does not have the key in
 * his/hers inventory. If this is true, a message is displayed to the user
 * that he/she needs the key to proceed. If the user has the key and is in
 * the kitchen, he/she can continue without a message.
 *
 * @param {object} scene Fetches the active scene
 */
function getIntoBedroom(scene) {
  //kollar ifall användaren har nyckeln i sitt inventory, annars säger den åt hen att hämta den i scen 0.
  if (activeSceneIndex === 2 && !inventory.includes(keys)) {
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
    goNextScene(scene.buttonRight.nextSceneIndex);
  }
  //om aktivt sceneindex är 3 (användaren kommit vidare från köket) så tas nyckeln bort från inventory
  if (activeSceneIndex === 3) {
    removeKeys();
    renderInventory();
  }
}

/**
 * Searches for the 'keys' in the 'inventory' array and removes them if found.
 * @param {Array} inventory - The array containing items.
 * @param {*} keys - The item to be searched for and removed.
 */
function removeKeys() {
  const keysIndex = inventory.indexOf(keys);

  if (keysIndex !== -1) {
    inventory.splice(keysIndex, 1);
  }
}

/**
 * Through an else if statement, finds out whether the user is in the bedroom
 * and has the phone in his inventory or not. If the user has the phone,
 * a message is displayed that the police are being called, if not, the message
 * instead reads that the player should pick up the phone that is on the porch.
 */
function checkForPhone() {
  //kollar om användaren har telefonen i sitt inventory när den befinenr sig i sovrummet och har olika beteende beroende på det.
  if (activeSceneIndex === 3 && !inventory.includes(iphone)) {
    playAgain.className = "playAgain";
    message.className = "message";
    message.textContent =
      "You should really try to find the phone to be able to call the police.. Hint: Go to the porch.";
    text.style.display = "none";

    setTimeout(function () {
      document.body.removeChild(message);
    }, 4000);
    document.body.appendChild(message);
  } else if (activeSceneIndex === 3 && inventory.includes(iphone)) {
    message.textContent =
      "Good thing you had the phone to call the police!\r\n'Hello officer! There's a dead woman in the bedroom at 104 Crazy Street in Palm Springs, come quick, I'm afraid the killer is still in the house!'";
    text.style.display = "none";

    setTimeout(function () {
      document.body.removeChild(message);
    }, 6000);
    document.body.appendChild(message);
  }
}

/**
 * Finds out if the user is in the lit bathroom (end scene). If the user is,
 * the function checks if there is a gun and bullets in the inventory.
 * If there is function winGame is called. If not, function loseGame is called.
 */
function checkInventoryForWinLose() {
  //kollar av inventory i den slutliga scenen om man väljer att attackera mördare.
  //skapar ny h1tag och ger den klassen message
  message.className = "message";
  playAgain.className = "playAgain";

  //om man är i scenen med index 5
  if (activeSceneIndex === 5) {
    //och det ligger en pistol och kulor i ens inventory
    if (inventory.includes(gun) && inventory.includes(bullets)) {
      winGame();
    } else {
      loseGame();
    }
  }
}

/**
 * A gunshot sound is played, and message telling the player he/she has won
 * by shooting the killer is displayed + "play again" button is showed
 */
function winGame() {
  message.textContent =
    "Victory!! You managed to attack the killer with your gun and bullets. You have won and neutralized the killer!";

  footer.style.display = "none";
  text.style.display = "none";
  leftButton.style.display = "none";
  rightButton.style.display = "none";
  document.body.style.backgroundImage = 'url("src/wingame.jpg")';

  document.body.appendChild(message);
  document.body.appendChild(playAgain);
  newGame(playAgain);
  playAudio("src/sounds/gunshot.mp3");
}

/**
 * A message is displayed stating that the user has lost
 * and died and gone to heaven while playing
 * a failure sound + "play again" button.
 */
function loseGame() {
  message.textContent =
    "Loser!! You haven't found the gun and the bullets, which allowed the killer to attack you first. You unfortunately died, but at least you went to heaven.";
  footer.style.display = "none";
  text.style.display = "none";
  leftButton.style.display = "none";
  rightButton.style.display = "none";
  document.body.style.backgroundImage = 'url("src/losegame.png")';

  document.body.appendChild(message);
  document.body.appendChild(playAgain);
  newGame(playAgain);
  playAudio("src/sounds/fail.mp3");
}

/**
 * Checks the presence of a scene asset in the inventory and updates the image and button visibility accordingly.
 * @param {string} sceneAsset - The asset associated with the scene to be checked.
 * @param {Array} inventory - An array containing the assets in the inventory.
 * @param {HTMLImageElement} imageElement - The HTML image element to display the asset.
 * @param {HTMLElement} buttonElement - The HTML element (button) controlling the asset's visibility.
 */
function checkAsset(sceneAsset, inventory, imageElement, buttonElement) {
  if (sceneAsset && inventory.indexOf(sceneAsset) === -1) {
    imageElement.src = sceneAsset;
    buttonElement.style.display = "block";
  } else {
    buttonElement.style.display = "none";
  }
}

/**
 * Handles button presses to add assets to the inventory and update the interface.
 * @param {string} sceneAsset The asset to be added to the inventory on the button press.
 * @param {Array} inventory An array containing the assets in the inventory.
 * @param {HTMLButtonElement} buttonElement The HTML element (button) that activates the function on click.
 * @param {string} pickupSound The sound played when an asset is picked up and added to the inventory.
 */
function handleButtonClick(sceneAsset, inventory, buttonElement, pickupSound) {
  buttonElement.onclick = function () {
    if (inventory.indexOf(sceneAsset) === -1) {
      inventory.push(sceneAsset);
      playAudio(pickupSound);
      buttonElement.style.display = "none";
      renderInventory();

      localStorage.setItem("inventory", JSON.stringify(inventory));
    }
  };
}

/**
 * Manages scene assets and their associated buttons, controlling their visibility and interactions.
 * @param {HTMLElement} addAssetButton - The button element for the first asset.
 * @param {HTMLElement} addAssetButton2 - The button element for the second asset.
 * @param {HTMLImageElement} assetImage - The image element displaying the first asset.
 * @param {HTMLImageElement} asset2Image - The image element displaying the second asset.
 * @param {Object} scene - The scene object containing asset information.
 * @param {string} scene.asset - The URL or identifier of the first asset.
 * @param {string} scene.asset2 - The URL or identifier of the second asset.
 */
function manageSceneAssetsAndButtons(
  addAssetButton,
  addAssetButton2,
  assetImage,
  asset2Image,
  scene
) {
  checkAsset(scene.asset, inventory, assetImage, addAssetButton);
  checkAsset(scene.asset2, inventory, asset2Image, addAssetButton2);

  handleButtonClick(
    scene.asset,
    inventory,
    addAssetButton,
    "src/sounds/pickup.mp3"
  );
  handleButtonClick(
    scene.asset2,
    inventory,
    addAssetButton2,
    "src/sounds/pickup.mp3"
  );
}

/**
 * Renders the inventory in the HTML footer section by populating it with images of collected assets.
 * @param {Array} inventory - The array containing URLs or identifiers of collected assets.
 */
function renderInventory() {
  const inventoryFooter = document.getElementById("inventory");
  inventoryFooter.innerHTML = "";
  
  for (const itemUrl of inventory) {
    const img = document.createElement("img");
    img.className = "inventoryImg";
    img.src = itemUrl;
    img.alt = "Asset Image";
    inventoryFooter.appendChild(img);
  }
  localStorage.setItem("inventory", JSON.stringify(inventory)); //uppdaterar inventory i localStorage
}

/**
 * Checks if the user is on stage 6, which means it ran away from the killer.
 * If the player is there, "bad boys" is played and a message saying that you neither won nor lost is displayed.
 */
function loseAndWin() {
  //funktion som körs när man väljer att springa iväg i sista scenen
  const message = document.createElement("h1");
  if (activeSceneIndex === 6) {
    playAudio("src/sounds/cops.mp3");
    playAgain.className = "playAgainN";
    message.className = "messageN";
    message.textContent =
      "You either lose nor win the game since you ran away.";

    footer.style.display = "none";
    text.style.display = "none";

    document.body.appendChild(message);
    document.body.appendChild(playAgain);
    newGame(playAgain);
  }
}

/**
 * Determines when the right and left buttons should not be displayed
 *
 * @param {HTMLButtonElement} leftButton Is a HTML button element
 * @param {HTMLButtonElement} rightButton Is a HTML button element
 */
function showButton(leftButton, rightButton) {
  //tar hand om när knapparna för att förflytta sig mellan rum ska visas och inte
  //visa inte vänster knapp på scen 0, 4 eller 6
  if (
    activeSceneIndex === 0 ||
    activeSceneIndex == 4 ||
    activeSceneIndex === 6
  ) {
    leftButton.style.display = "none";
  }

  //visa inte höger knapp på scen 4 eller 6
  if (activeSceneIndex === 4 || activeSceneIndex === 6) {
    rightButton.style.display = "none";
  }
}

/**
 * Changes the activeSceneIndex to the scene currently active in the game,
 * then runs the function that fetches all elements for the active scene.
 *
 * @param {number} sceneIndex Fetches the active sceneIndex number
 */
function goNextScene(sceneIndex) {
  //gör om det aktiva sceneindex till sidan man nu befinner sig, är man ex på scen med indexvärde 1 (vardagsrummet) och trycker på item två (högra knappen) så komemr man iom objektets egenskaper till scenen med indexvärde två (köket)
  activeSceneIndex = sceneIndex; //ändrar activesceneindex till sceneindexet som nu är aktivt
  renderScene(); //kör funktionen renderscene som hämtar hem allting för den aktiva scenen
  localStorage.setItem("activeSceneIndex", activeSceneIndex.toString());
}

/**
 * Determines that all elements in scenes should be displayed.
 *
 * @param {HTMLButtonElement} leftButton Is a HTML button element
 * @param {HTMLButtonElement} rightButton Is a HTML button element
 * @param {string} text Gets text element
 * @param {object} buttonLeft Gets the object
 * @param {object} buttonRight Gets the object
 * @param {HTMLElement} body Fetches body HTML element
 * @param {HTMLElement} footer Fetches footer HTML element wich icludes inventory
 */
function setDisplayStyle(
  leftButton,
  rightButton,
  text,
  buttonLeft,
  buttonRight,
  body,
  footer
) {
  leftButton.style.display = "block";
  rightButton.style.display = "block";
  text.style.display = "block";
  buttonLeft.style.display = "block";
  buttonRight.style.display = "block";
  body.style.display = "content";
  footer.style.display = "block";
}

/**
 * Make the power button for lamp only appear in the dark bathroom and
 * give it a click event that leads to the light bathroom.
 */
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

/**
 *Creates an on click event for the "Play Again" button.
 *
 * @param {HTMLButtonElement} playAgain Button that asks if the player wants to play again
 */
function newGame(playAgain) {
  playAgain.addEventListener("click", function () {
    //rensar localStorage
    localStorage.removeItem("inventory");
    localStorage.removeItem("activeSceneIndex");

    //återställ aktiva scenen till start och ladda om sidan
    localStorage.setItem("activeSceneIndex", "0");
    window.location.reload();
  });
}
