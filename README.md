# Murder mystery 
_A simple text-based game mainly made in Javascript._
 
## Project description

In this game, the player must find various objects and navigate between several rooms to solve a murder mystery. There are three different endings depending on what the player has picked up during the game. The different rooms in the game can also change behavior depending on what the player has in his/hers inventory.


## Basic code structure

### Diffrents scenes
 
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
 