let activeSceneIndex = 0;
const inventory = []; //array där saker spelaren plockat upp läggs

const scenes = [
  {
    //scen 0 - veranda
    text: "Pick up the items you can see to put them in your inventory. Maybe they'll come in handy later. After that you might want to step into the house?",
    asset: "Mobil",
    asset2: "Nyckel",
    item1: {},
    item2: {
      text: "Go to livingroom",
      nextSceneIndex: 1,
    },
    backgroundImage: 'url("src/porch.jpg")',
  },
  {
    //scen 1 - vardagsrum
    text: "It looks like there are two things to add to your inventory! Collect them, they may come in handy later on..",
    asset: "Patroner",
    asset2: "Svart pulver",
    item1: {
      text: "Go to porch",
      nextSceneIndex: 0,
    },
    item2: {
      text: "Go to kitchen",
      nextSceneIndex: 2,
    },
    backgroundImage: 'url("src/livingroom.jpg")',
  },
  {
    //scen 2 - kök
    text: "Oh my god! There is blood here, maybe this is where the victim was attacked?",
    asset: "Kniv med blod",
    asset2: "Tejp",
    item1: {
      text: "Go to livingroom",
      nextSceneIndex: 1,
    },
    item2: {
      text: "Go to bedroom",
      nextSceneIndex: 3,
    },
    backgroundImage: 'url("src/kitchen.jpg")',
  },
  {
    //scen 3 - sovrum
    text: "Call 911! Quick, click the right item in your inventory to call the police.",
    asset: "Pistol",
    asset2: "Vattenglas",
    item1: {
      text: "Go to kitchen",
      nextSceneIndex: 2,
    },
    item2: {
      text: "Go to bathroom",
      nextSceneIndex: 4,
    },
    backgroundImage: 'url("src/bedroom.jpg")',
  },
  {
    //scen 4 - badrum släckt
    text: "This was room is creepy, I can't seem to find any way out.. Its so dark in here, maybe you should turn on the light?",
    item1: {
      text: "Go to bedroom",
      nextSceneIndex: 3,
    },
    item2: {
      text: "Turn the light on",
      nextSceneIndex: 5,
    },
    backgroundImage: 'url("src/bathroomDark.jpg")',
  },
  {
    //scen 5 - badrum tänt
    text: "AHHHH!! Make a quick decision about whether you want to run for your life or whether you want to attack the person in front of you.",
    item1: {
      text: "Run for your life",
      nextSceneIndex: 6,
    },
    item2: {
      text: "Attack",
      nextSceneIndex: 5,
    },
    backgroundImage: 'url("src/bathroom.jpg")',
  },
  {
    //scen 6 - polisstation
    text: "Thanks for your help, you were very brave! It was a smart move to run, since the killer was still in the house. We're taking over from now. Your clues will help us find and ultimately convict the suspect.",
    item1: {},
    item2: {},
    backgroundImage: 'url("src/policestation.jpg")',
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
  backgroundImage: 'url("src/backgroundimg.jpg")',
};