let activeSceneIndex = 0;

const scenes = [
  { //scen 1 - veranda
    text: "Pick up the items you can see to put them in your inventory. Maybe they'll come in handy later. After that you might want to go inside the house?",
    item1: {
      text: "display none",
      nextSceneIndex: null,
    },
    item2: {
      text: "Go to livingroom",
      nextSceneIndex: 1,
    },
    backgroundImage: 'url("src/porch.jpg")'
  },
  { //scen två - vardagsrum
    text: "It looks like there are two things to add to your inventory! Collect them, they may come in handy later on..",
    item1: {
      text: "Go to porch",
      nextSceneIndex: 0,
    },
    item2: {
      text: "Go to kitchen",
      nextSceneIndex: 2,
    },
    backgroundImage: 'url("src/livingroom.jpg")'
  },
  { //scen tre - kök
    background: 'url("kitchen.jpg")',
    text: "Oh my god! There is blood here, maybe this is where the victim was attacked?",
    item1: {
      text: "Go to livingroom",
      nextSceneIndex: 1,
    },
    item2: {
      text: "Go to bedroom",
      nextSceneIndex: 3,
    },
    backgroundImage: 'url("src/kitchen.jpg")'
  },
  { //scen fyra - sovrum
    text: "Call 911! Quick, click the right item in your inventory to call the police.",
    item1: {
      text: "Go to kitchen",
      nextSceneIndex: 2,
    },
    item2: {
      text: "Go to bathroom",
      nextSceneIndex: 4,
    },
    backgroundImage: 'url("src/bedroom.jpg")'
  },
  { //scen fem - badrum släckt
    text: "Its so dark here, maybe you should put the lamp on?",
    item1: {
      text: "Go to bedroom",
      nextSceneIndex: 3,
    },
    item2: {
      text: "Turn the light on",
      nextSceneIndex: 5,
    },
    backgroundImage: 'url("src/bathroomDark.jpg")'
  },
  { //scen fem - badrum tänt
    text: "AHHHH!! Quickly make a choice about what you want to attack him with.",
    item1: {
      text: "Run for your life",
      nextSceneIndex: 0,
    },
    item2: {
      text: "Attack",
      nextSceneIndex: 5,
    },
    backgroundImage: 'url("src/bathroom.jpg")'
  },
];



//startpage content
const start = {
  h1: "MURDER MYSTERY",
  h3: "You're a private investigator on your way to a client who has experienced discomfort in her own house and is afraid that she has a stalker.. She called you screaming for help.",
  h4: "How to play the game:",
  p1: "1. Search the environment around you and collect objects.",
  p2: "2. Use the items you have previously found when needed in the game, for example to get into new locations or to use to create new items.",
  p3: "3. Have fun while trying to solve the case!",
  backgroundImage: 'url("src/backgroundimg.jpg")'
}
