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
    text: "It looks like there are two things to add to your inventory!",
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
  },
  { //scen fyra - sovrum
    background: 'url("bedroom.jpg")',
    text: "Call 911!",
    item1: {
      text: "Go to kitchen",
      nextSceneIndex: 2,
    },
    item2: {
      text: "Go to bathroom",
      nextSceneIndex: 4,
    },
  },
  { //scen fem - badrum
    background: 'url("bathroom.jpg")',
    text: "Its so dark here, maybe you should put the lamp on?",
    item1: {
      text: "Go to bedroom",
      nextSceneIndex: 3,
    },
    item2: {
      text: "Go to closet",
      nextSceneIndex: 5,
    },
  }, //sen kanske scen 6 - gaderob, där mördaren är
];
