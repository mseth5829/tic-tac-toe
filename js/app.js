var toggle = 0;
var classArray = [];
var classes = {};
var gameFinished = false;
var playerScore = 0;
var enemyScore = 0;
var squareElement = document.getElementsByClassName("square");
var players = [
  '<img src="css/img/user2.gif" class="icon">',
  '<img src="css/img/enemy.gif" class="icon">',
];
var winningPositions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
var aiPositionChoices = [0,1,2,3,4,5,6,7,8];



//Show image (toggled) and set class names when square is clicked
function showImage(i) {
  return function() {
//Simulate toggle if in 2-player mode
    if(document.getElementById("2-player").checked === true){
      multiPlayer(i);
//Against computer mode
    }else if(document.getElementById("solo").checked === true){
      solo(i);
    }
  }
}


function multiPlayer(i){
//Only show image when game is still on and there is nothing in square
  if(squareElement[i].className === "square userP"
  || squareElement[i].className === "square enemyP"
  || gameFinished === true){
  }else{
    if(toggle === 0){
      squareElement[i].innerHTML=players[toggle];
      squareElement[i].className="square userP";
      toggle = 1;
    }else {
      squareElement[i].innerHTML=players[toggle];
      squareElement[i].className="square enemyP";
      toggle = 0;
    }
//Clear class array so we don't "push" more than required class types (more than 9)
  classArray = [];
  }
}

function solo(i) {
  if(squareElement[i].className === "square userP"
  || squareElement[i].className === "square enemyP"
  || gameFinished === true){
  }else{
    squareElement[i].innerHTML = players[0];
    squareElement[i].className="square userP";
    classArray = [];
    aiPositionChoices.splice(aiPositionChoices.indexOf(i),1);
    console.log("aiPositionChoices :" + aiPositionChoices)
    setTimeout(enemyMove(), 10000);
    classArray = [];
  }
}

function enemyMove() {
  if(aiPositionChoices.length===0){
  }else{
    var enemyPosition
    var randomMove = Math.floor(Math.random() * aiPositionChoices.length);
    enemyPosition = aiPositionChoices[randomMove];
    console.log("random number to choose from aiPChoices: " + randomMove)
    console.log("random number is chosen from 0 to :" + aiPositionChoices.length)
    console.log("enemyChosenPosition :" + enemyPosition)
    squareElement[enemyPosition].innerHTML=players[1];
    squareElement[enemyPosition].className = "square enemyP"
    aiPositionChoices.splice(aiPositionChoices.indexOf(enemyPosition),1);
    console.log("final ailist: " + aiPositionChoices)
    createClassArray();
    checkWinningPosition();
  }
}

function createClassArray () {
  for(var i =0; i<squareElement.length; i++){
//Create an array of class types for squares
    classArray.push(squareElement[i].className);
  }
//Create an object that holds key/value pairs of square-position/class-type
  for(var i =0; i<squareElement.length; i++){
    classes[i]=classArray[i];
  }
}

//Compare class types to winning positions
function checkWinningPosition() {
  for(var i = 0; i<winningPositions.length; i++){
    if(classes[winningPositions[i][0]] === "square userP"
    && classes[winningPositions[i][1]] === "square userP"
    && classes[winningPositions[i][2]] === "square userP"
    && gameFinished === false){
      playerScore += 1;
      document.getElementById("userScore").textContent=playerScore;
      gameFinished = true;
    }else if(classes[winningPositions[i][0]] === "square enemyP"
    && classes[winningPositions[i][1]] === "square enemyP"
    && classes[winningPositions[i][2]] === "square enemyP"
    && gameFinished === false){
      enemyScore += 1;
      document.getElementById("enemyScore").innerHTML=enemyScore;
      gameFinished = true;
    }
  }
}

//Clear board and reset class names when button is pressed
function clear() {
  for(var i=0; i<squareElement.length; i++){
    squareElement[i].innerHTML="";
  }
  for(var i=0; i<squareElement.length; i++){
    squareElement[i].className="square"
  }
  gameFinished = false;
  aiPositionChoices = [0,1,2,3,4,5,6,7,8];
}

for(var i=0; i<squareElement.length; i++){
  squareElement[i].addEventListener('click', showImage(i));
  squareElement[i].addEventListener('click', createClassArray);
  squareElement[i].addEventListener('click', checkWinningPosition);
}

document.getElementById("clear").addEventListener('click', clear);
