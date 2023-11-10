# Murder mystery 
_A simple text-based game mainly made in Javascript._
 
## 1. Project description

In this game, the player must find various objects and navigate between several rooms to solve a murder mystery. There are three different endings depending on what the player has picked up during the game. The different rooms in the game can also change behavior depending on what the player has in his/hers inventory.


## 2. Basic code structure

### 2.1 The diffrents scenes
 The game has a start page and after the player chooses to start the game, it instead jumps into an array of different scenes. The headings below explain how this happens.

#### 2.1.1 Start page
 The game's start page has been made in html but received its content from Javascript. You can see how this was done by checking the index.html and scenes.js files. 

This could just as well have been done in html only but since one of the big parts during the work on the game was using Javscript I chose to do it this way.


#### 2.1.2 Array with all the other pages in the game
All scenes in the game are in an array made in Javascript that retrieves content to index.html. Each scene includes the following items:
- A text
- Two different things to put in the inventory if the player click on them
- Two objects that are the buttons the player uses to navigate between rooms. In these objects there is a text and "nextSceneIndex"
- A background image

---

### 2.2 Global variables
There are few global variables in the code, because I wanted to avoid them. Those that exist and what their main task is, is shown below:

- let activeSceneIndex = 0;
_This variable keeps track of which scene the player is on and thus needs to be changeable (let). The variable is used extensively in the code, for example in if else statements when different things must happen depending on where the player is._

- const inventory = [];
_This is where the various things found in the rooms are placed once the player has picked them up. The variable therefore needs to be an array that takes care of several different things._
_It is also used a lot to check if certain things are in the player's inventory by using if else conditions to generate a certain behavior._

- const scenes = [{},{}];
_Needs to be global as the different scenes in the array are called and checked many times. Contains a lot of content necessary for the game such as items to pick up and texts for each room._

- const start = {};
_Doesn't necessarily need to be global but still is because I wanted all scenes to be bundled in scenes.js_

- let message = document.createElement("h1");
_Called several times in different functions to generate a message to the player based on which room it is in and what it has in its inventory._

- let audio;
_Used to give different sounds to scenes and elements._

---

### 2.3 The functions
Let's talk briefly about the functions, which are the funniest part of the whole game and what helps it become interactive. Below is a little about each function:

- main()
_The first function to run calls the startGame function._

- startGame()
_First declares all existing dom elements from index.html and hides the elements that should only be displayed when the scenes array runs._
_Also creates a click event for the start button which removes all elements on the start page and calls the function to show the first scene in "scenes"._

- renderScene()
_skriv nåt_

- playAudio(audioSrc)
_skriv nåt_

- getIntoBedroom(scene)
_skriv nåt_

- checkForPhone()
_skriv nåt_

-checkInventoryForWinLose(button1, button2)
_skriv nåt_

- collectJoinAndDisplayAssets(addAssetButton, addAssetButton2, assetImage, asset2Image, inventoryFooter, scene)
_skriv nåt_

- loseAndWin()
_skriv nåt_

- showButton(button1, button2)
_skriv nåt_

- goNextScene(sceneIndex)
_skriv nåt_

- setDisplayStyle(button1, button2, text, item1, item2, body, footer)
_skriv nåt_

- powerButton()
_skriv nåt_

 
**Bold text**

> "aasdasd asdas da sdhgas d
> asdasdasd"
 
`git status`
 
```
<body>
  hello world
</body>
```
 
[Min html fil](./index.html)
 