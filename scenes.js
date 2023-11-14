/**
 * @type {number} Gives activeSceneIndex a default value of 0 or get the value from LS
 */
let activeSceneIndex = parseInt(localStorage.getItem("activeSceneIndex")) || 0;


let storedInventory = localStorage.getItem("inventory");
let inventory = storedInventory ? JSON.parse(storedInventory) : [];

/**
 * @typedef {{
 *   text: string,
 *   asset: string,
 *   asset2: string,
 *   buttonLeft: { text: string, nextSceneIndex: number },
 *   buttonRight: { text: string, nextSceneIndex: number },
 *   backgroundImage: string
 * }} Scene
 */

/**
 * URL or identifier for keys in the inventory.
 * @type {string}
 */
const keys = "src/inventoryitems/keys.png";

/**
 * URL or identifier for iPhone in the inventory.
 * @type {string}
 */
const iphone = "src/inventoryitems/iphone.png";

/**
 * URL or identifier for fingerprint powder in the inventory.
 * @type {string}
 */
const powder = "src/inventoryitems/fingerprintPowder.png";

/**
 * URL or identifier for bullets in the inventory.
 * @type {string}
 */
const bullets = "src/inventoryitems/bullets.png";

/**
 * URL or identifier for knife in the inventory.
 * @type {string}
 */
const knife = "src/inventoryitems/blodkniv.png";

/**
 * URL or identifier for tape in the inventory.
 * @type {string}
 */
const tape = "src/inventoryitems/tape.png";

/**
 * URL or identifier for gun in the inventory.
 * @type {string}
 */
const gun = "src/inventoryitems/gun.png";



/**
 * @type {Scene[]} Defines that scenes is an array with scenes
 */
const scenes = [
  {
    //scen 0 - veranda
    text: "Pick up the items you can see to put them in your inventory. Maybe they'll come in handy later. After that you might want to step into the house?",
    asset: iphone,
    asset2: keys,
    buttonLeft: {},
    buttonRight: {
      text: "Go to livingroom",
      nextSceneIndex: 1,
    },
    backgroundImage: 'url("src/porch.jpg")',
  },
  {
    //scen 1 - vardagsrum
    text: "It looks like there are two things to add to your inventory! Collect them, they may come in handy later on..",
    asset: powder,
    asset2: bullets,
    buttonLeft: {
      text: "Go to porch",
      nextSceneIndex: 0,
    },
    buttonRight: {
      text: "Go to kitchen",
      nextSceneIndex: 2,
    },
    backgroundImage: 'url("src/livingroom.jpg")',
  },
  {
    //scen 2 - kök
    text: "Oh my god! There is blood here, maybe this is where the victim was attacked?",
    asset: knife,
    asset2: tape,
    buttonLeft: {
      text: "Go to livingroom",
      nextSceneIndex: 1,
    },
    buttonRight: {
      text: "Go to bedroom",
      nextSceneIndex: 3,
    },
    backgroundImage: 'url("src/kitchen.jpg")',
  },
  {
    //scen 3 - sovrum
    text: "Call 911! Quick, click the right item in your inventory to call the police. If you don't have it you should look for it on the porch",
    asset: gun,
    asset2: "",
    buttonLeft: {
      text: "Go to kitchen",
      nextSceneIndex: 2,
    },
    buttonRight: {
      text: "Go to bathroom",
      nextSceneIndex: 4,
    },
    backgroundImage: 'url("src/bedroom.jpg")',
  },
  {
    //scen 4 - badrum släckt
    text: "This room was so creepy, I can't seem to find any way out.. Its so dark in here, maybe you should turn on the light?",
    buttonLeft: {
      text: "Go to bedroom",
      nextSceneIndex: 3,
    },
    buttonRight: {
      text: "Turn the light on",
      nextSceneIndex: 5,
    },
    backgroundImage: 'url("src/bathroomDark.jpg")',
  },
  {
    //scen 5 - badrum tänt
    text: "AHHHH!! Make a quick decision about whether you want to run for your life or whether you want to attack the person in front of you.",
    buttonLeft: {
      text: "Run for your life",
      nextSceneIndex: 6,
    },
    buttonRight: {
      text: "Attack",
      nextSceneIndex: 5,
    },
    backgroundImage: 'url("src/bathroom.jpg")',
  },
  {
    //scen 6 - polisstation
    text: "",
    buttonLeft: {},
    buttonRight: {},
    backgroundImage: 'url("src/policestation.jpg")',
  },
];

/**
 * @typedef {{
 *   h1: string,
 *   h3: string,
 *   h4: string,
 *   p1: string,
 *   p2: string,
 *   p3: string,
 *   backgroundImage: string
 * }} Start
 */
/**
 * A list of mocked scenes to use before we fetch them from our DB.
 * @type {Start{}}
 */
const start = {
  //startpage content
  h1: "MURDER MYSTERY",
  h3: "You're a private investigator on your way to a client who has experienced discomfort in her own house and is afraid that she has a stalker... She called you screaming for help.",
  h4: "How to play the game:",
  p1: "1. Search the environment around you and collect objects.",
  p2: "2. Use the items you have previously found when needed in the game, for example to get into new locations or to use to create new items.",
  p3: "3. Have fun while trying to solve the case!",
  backgroundImage: 'url("src/backgroundimg.jpg")',
};
