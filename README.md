# Murder mystery 
_A simple game mainly made using vanilla Javascript._
 
## 1. Project description
In this game, the player must find various objects and navigate between several rooms to solve a murder mystery. There are three different endings depending on what the player has picked up throughout the game and what he/she chooses to do in the final scene. The different rooms in the game can also change behavior depending on what the player has in his/hers inventory.

### 1.1 Possible endings for the game

#### 1.1.1 Win the game
If the player has picked up the key (needed to advance in the game from scene 3 to scene 4), the gun and the bullets and then chooses to attack the killer, he/she wins the game by shooting and incapacitating the killer.

#### 1.1.2 Lose the game
If the player has not picked up both the gun and the bullets and chooses to attack the killer, he/she dies and goes to heaven.

#### 1.1.3 Neither win nor lose the game
If the player chooses to run for his/hers life instead of attacking the killer, he/she comes to the police station because he is a coward and therefore does not win, but also does not lose because he/she is still alive.

### 1.2 Scenes in the game
- Start page
- The porch
- The living room
- The kitchen
- The bedroom
- Dark bathroom
- Lit bathroom
- Police station

### 1.3 Items to pick up in game
- Phone
- Keys
- Fingerprint powder
- Bullets
- Tape
- Knife
- Gun

---

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

### 2.2 Global variables
There are few global variables in the code, because I wanted to avoid them. Those that exist and what their main task is, is shown below:

- **let activeSceneIndex = 0;**\
_This variable keeps track of which scene the player is on and thus needs to be changeable (let). The variable is used extensively in the code, for example in if else statements when different things must happen depending on where the player is._

- **const inventory = [];**\
_This is where the various things found in the rooms are placed once the player has picked them up. The variable therefore needs to be an array that takes care of several different things._
_It is also used a lot to check if certain things are in the player's inventory by using if else conditions to generate a certain behavior._

- **const scenes = [{},{}];**\
_Needs to be global as the different scenes in the array are called and checked many times. Contains a lot of content necessary for the game such as items to pick up and texts for each room._

- **const start = {};**\
_Doesn't necessarily need to be global but still is because I wanted all scenes to be bundled in scenes.js_

- **let message = document.createElement("h1");**\
_Called several times in different functions to generate a message to the player based on which room it is in and what it has in its inventory._

- **let audio;**\
_Used to give different sounds to scenes and elements._

### 2.3 The functions
Let's talk briefly about the functions, which are the funniest part of the whole game and what helps it become interactive. Below is a little about each function:

- **main()**\
_The first function to run calls the startGame function._

- **startGame()**\
_First declares all existing dom elements from index.html and hides the elements that should only be displayed when the scenes array runs._
_Also creates a click event for the start button which removes all elements on the start page and calls the function to show the first scene in "scenes"._

- **renderScene()**\
_Gets elements for the scenes and declares them in Javascript. Creates click events for the button on the right and left and calls many functions required for the game to function properly._

- **playAudio(audioSrc)**\
_Creates the variable that retrieves different sounds and displays it in the DOM. Checks through an if statement if a sound is already playing when a new sound arrives. If so, the first sound is paused and removed from the DOM._

- **getIntoBedroom(scene)**\
_Checks if the user is in the kitchen and does not have the key in his/hers inventory. If this is true, a message is displayed to the user that he/she needs the key to proceed. If the user has the key and is in the kitchen, he/she can continue without a message._

- **checkForPhone()**\
_Through an else if statement, finds out whether the user is in the bedroom and has the phone in his inventory or not. If the user has the phone, a message is displayed that the police are being called, if not, the message instead reads that the player should pick up the phone that is on the porch._

- **checkInventoryForWinLose(button1, button2)**\
_Finds out if the user is in the lit bathroom (end scene). If the user is, the function checks if there is a gun and bullets in the inventory. If there is, a gunshot sound is played and a message that the player has won by shooting the killer is displayed. If not, a message is displayed instead stating that the user has lost and died and gone to heaven while playing a failure sound._

- **collectJoinAndDisplayAssets(addAssetButton, addAssetButton2, assetImage, asset2Image, inventoryFooter, scene)**\
_In this function there is a condition that checks if asset and asset2 exist on the object in the scene, if it does it is rendered, if not it is hidden._\
_Also checks if users have already added it to inventory, if they have then the item is hidden._\
_Also gives asset and asset2 click event which causes them to be added to inventory and emit sound when the player picks them up._

- **loseAndWin()**\
_Checks if the user is on stage 6, which means it ran away from the killer. If the player is there, "bad boys" is played and a message saying that you neither won nor lost is displayed._

- **showButton(button1, button2)**\
_Determines when the right and left buttons should not be displayed_

- **goNextScene(sceneIndex)**\
_Changes the activeSceneIndex to the scene currently active in the game, then runs the function that fetches all elements for the active scene._

- **setDisplayStyle(button1, button2, text, item1, item2, body, footer)**\
_Determines that all elements in scenes should be displayed_

- **powerButton()**\
_Make the power button for lamp only appear in the dark bathroom and give it a click event that leads to the light bathroom_

---

## 3. Learn more about the project
This game was made as a school project and is the first project I ever created using Javascript as the main language.\
I wanted to learn about arrays, loops and if else conditions, which led to a large part of the code for the program being made with these very parts.

### 3.1 What is needed to run the program
To run the program you need to have access to a computer and all the files (you can download the zip file on GitHub) or open the page through this link: [Murder Mystery](https://elsabonde.github.io/murdermystery-2/). If you have problems opening the page, pleaze contact me at (e.g.: elsasofiabonde@gmail.com).

### 3.2 Tools used to create the game
To create the program I have used Html5, Css3 and JavaScript. The wallpapers are AI generated using [Gencraft.com](https://gencraft.com/generate) and I then added creepy details using the program [InkScape version 1.3](https://inkscape.org/release/inkscape-1.3/windows/64-bit/msi/?redirected=1). The various sound effects in the program were downloaded from [Fesliyanstudios.com](https://www.fesliyanstudios.com/) and [Pixabay.com](https://pixabay.com/sound-effects/search/door/). A big thanks to these sources and free image and editing software.

### 3.3 What I learned working on this project
While working on the game, I have learned to search for answers and how to ask a question as clearly as possible. This is when you get the best help and thus learn to solve problems on your own.

I have also learned that patience is probably the best quality you can have when learning a new programming language.

I have come to the realization that having a community of like-minded people to bounce problems with is very helpful and should not be taken for granted when you are a beginner at something, both by teaching and learning.

### 3.4 Maintenance and how to contact me
This program will be updated the more Javascript I learn and when it is, this file will also be maintained.

If you have any questions or find a bug in the program that you want to share don't hesitate to contact me at (e.g.: elsasofiabonde@gmail.com).

#### 3.4.1 Contributing
If you want to contribute to the game, follow these steps:
1. Fork the project.
2. Create a new branch for your work: 
`git checkout -b your-new-branch`
3. Make your changes and commit: 
`git commit -m "Your change"`
4. Push to your branch: 
`git push origin your-new-branch`
5. Create a pull request on GitHub.