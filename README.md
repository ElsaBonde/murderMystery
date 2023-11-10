# Murder mystery 
_A simple text-based game mainly made in Javascript._
 
## Project description

In this game, the player must find various objects and navigate between several rooms to solve a murder mystery. There are three different endings depending on what the player has picked up during the game. The different rooms in the game can also change behavior depending on what the player has in his/hers inventory.


## Basic code structure

### Diffrents scenes
 The game has a start page and after the player chooses to start the game, it instead jumps into an array of different scenes. The headings below explain how this happens.

#### Start page
 The game's start page has been made in html but received its content from Javascript, as follows:

Html:
```
<div class="startRoom">
      <h1 class="startH1"><!-- hämtas via js --></h1>
      <div class="textBox">
        <h3 class="startH3"><!-- hämtas via js --></h3>
        <h4 class="startH4"><!-- hämtas via js --></h4>
        <p class="startP"><!-- hämtas via js --></p>
        <p class="startP"><!-- hämtas via js --></p>
        <p class="startP"><!-- hämtas via js --></p>
        <button id="startGameButton" type="submit" class="startGame">
          Start
        </button>
      </div>
```

Javascript:
```
const start = {
  h1: "MURDER MYSTERY",
  h3: "You're a private investigator on your way to a client who has experienced discomfort in her own house and is afraid that she has a stalker.. She called you screaming for help.",
  h4: "How to play the game:",
  p1: "1. Search the environment around you and collect objects.",
  p2: "2. Use the items you have previously found when needed in the game, for example to get into new locations or to use to create new items.",
  p3: "3. Have fun while trying to solve the case!",
  backgroundImage: 'url("src/backgroundimg.jpg")',
};
```
This could just as well have been done in html only but since one of the big parts during the work on the game was using Javscript I chose to do it this way.

#### Array with all the other pages in the game
All scenes in the game are in an array made in Javascript that retrieves content to index.html. Each scene includes the following items:
- A text
- Two different things to put in the inventory if the player click on them
- Two objects that are the buttons the player uses to navigate between rooms. In these objects there is a text and "nextSceneIndex"
- A background image

This is what the html code looks like for the scenes:
```
<p id="text"><!-- hämtas via js --></p>
    <img id="powerSwitch" src="src/powerswitch.png" alt="powerswitch" />
    <button id="item-1-b">
      <p id="item-1"><!-- hämtas via js --></p>
    </button>
    <button id="item-2-b">
      <p id="item-2"><!-- hämtas via js --></p>
    </button>

    <button id="asset-b">
      <img src="" id="asset-image" alt="Asset Image">
    </button>
    <button id="asset-b2">
      <img src="" id="asset-image2" alt="Asset Image 2">
    </button>
```

And the Javascript for the first scene and the the declaration of the array:
```
const scenes = [
  {
    //scen 0 - veranda
    text: "Pick up the items you can see to put them in your inventory. Maybe they'll come in handy later. After that you might want to step into the house?",
    asset: "src/inventoryitems/iphone.png",
    asset2: "src/inventoryitems/keys.png",
    item1: {},
    item2: {
      text: "Go to livingroom",
      nextSceneIndex: 1,
    },
    backgroundImage: 'url("src/porch.jpg")',
  },
```




- List item 1
- List item 2
 
---
 
**Bold text**
**Bold text**
_Italic text_
_Italic text_
 
> "aasdasd asdas da sdhgas d
> asdasdasd"
 
`git status`
 
```
<body>
  hello world
</body>
```
 
[Min html fil](./index.html)
 