
var toggle = 0;
var classArray = [];
var gameFinished = false;
var playerScore = 0;
var enemyScore = 0;
var enemyTurn = false;
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
var enemyInterval;
var enemyPosition;
var blockPositions = [
  [[1,2],[4,8],[3,6],[1,2],0],
  [[0,2],[4,7],[0,2],[0,2],1],
  [[0,1],[4,6],[5,8],[0,1],2],
  [[0,6],[4,5],[0,6],[9,9],3],
  [[0,8],[2,6],[3,5],[1,7],4],
  [[2,8],[3,4],[2,8],[3,4],5],
  [[2,4],[0,3],[7,8],[2,4],6],
  [[6,8],[1,4],[1,4],[6,8],7],
  [[0,4],[2,5],[6,7],[0,4],8]
];

//Depending on whether user has chosen solo or 2-player mode, go down different tracks
function chooseMode(i) {
  return function() {
    if(document.getElementById("2-player").checked === true){
      multiPlayer(i);
    }else if(document.getElementById("solo").checked === true){
      solo(i);
    }
  }
}

//Toggle between red and green heads when in 2-player mode
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
      enemyTurn = true;
    }else {
      squareElement[i].innerHTML=players[toggle];
      squareElement[i].className="square enemyP";
      toggle = 0;
      enemyTurn = false;
    }
//Clear class array so we don't "push" more than required class types (more than 9)
  classArray = [];
  }
}

//After displaying user's move remove that "position" from enemy's "aiPositionChoices" and set up enemy move
function solo(i) {
  if(squareElement[i].className === "square userP"
  || squareElement[i].className === "square enemyP"
  || gameFinished === true){
  }else{
    console.log("Enemy's before green move turn is "+ enemyTurn);
    squareElement[i].innerHTML = players[0];
    squareElement[i].className="square userP";
    aiPositionChoices.splice(aiPositionChoices.indexOf(i),1);
    enemyTurn = true;
    if(enemyTurn === true){
      for(var i=0; i<squareElement.length; i++){
        squareElement[i].addEventListener('click',unclickable);
      }
    enemyInterval = setInterval(enemyMove, 1000);
    classArray = [];
    }
  }
}

function unclickable() {
  if(enemyTurn === true){
  }
}

//Set up enemy move and then have that square be "unplayable" by enemy, check if enemy's move has garnerned him a win
function enemyMove() {
//If there is still a move to be made and game is still going on
  if(aiPositionChoices.length===0 || gameFinished === true){
  }else{
    console.log("Enemy's turn when enemy needs to think of move is "+ enemyTurn);
    moveSetUp(i);
    aiPositionChoices.splice(aiPositionChoices.indexOf(enemyPosition),1);
    classArray = [];
    createClassArray();
    checkWinningPosition();
    clearInterval(enemyInterval);
    enemyTurn = false
  }
}

//Enemy will look for winning positions first, then potential blocking positions, if not it will choose a random position
function moveSetUp(i) {
  enemyWin();
  enemyBlock();
  enemyRandom();
}

//If enemy is set up to win choose corresponding winning position
function enemyWin(){
  for(var i = 0; i<blockPositions.length; i++){
    if(
       classArray[blockPositions[i][0][0]] === "square enemyP" && classArray[blockPositions[i][0][1]] === "square enemyP"
    && classArray[blockPositions[i][4]] !== "square userP" && enemyTurn === true
    || classArray[blockPositions[i][1][0]] === "square enemyP" && classArray[blockPositions[i][1][1]] === "square enemyP"
    && classArray[blockPositions[i][4]] !== "square userP" && enemyTurn === true
    || classArray[blockPositions[i][2][0]] === "square enemyP" && classArray[blockPositions[i][2][1]] === "square enemyP"
    && classArray[blockPositions[i][4]] !== "square userP" && enemyTurn === true
    || classArray[blockPositions[i][3][0]] === "square enemyP" && classArray[blockPositions[i][3][1]] === "square enemyP"
    && classArray[blockPositions[i][4]] !== "square userP" && enemyTurn === true
    ){
      enemyPosition=blockPositions[i][4];
      squareElement[enemyPosition].innerHTML=players[1];
      squareElement[enemyPosition].className = "square enemyP";
      enemyTurn = false;
      console.log("Enemy's turn after enemy win move is "+ enemyTurn);
    }
  }
}

//If user is set up to win choose corresponding block position
function enemyBlock(i) {
  for(var i = 0; i<blockPositions.length; i++){
    if(
       classArray[blockPositions[i][0][0]] === "square userP" && classArray[blockPositions[i][0][1]] === "square userP"
    && classArray[blockPositions[i][4]] !== "square enemyP" && enemyTurn === true
    || classArray[blockPositions[i][1][0]] === "square userP" && classArray[blockPositions[i][1][1]] === "square userP"
    && classArray[blockPositions[i][4]] !== "square enemyP" && enemyTurn === true
    || classArray[blockPositions[i][2][0]] === "square userP" && classArray[blockPositions[i][2][1]] === "square userP"
    && classArray[blockPositions[i][4]] !== "square enemyP" && enemyTurn === true
    || classArray[blockPositions[i][3][0]] === "square userP" && classArray[blockPositions[i][3][1]] === "square userP"
    && classArray[blockPositions[i][4]] !== "square enemyP" && enemyTurn === true
    ){
      enemyPosition=blockPositions[i][4];
      squareElement[enemyPosition].innerHTML=players[1];
      squareElement[enemyPosition].className = "square enemyP";
      enemyTurn = false;
      console.log("Enemy's turn after it decides to block is "+ enemyTurn);
    }
  }
}

//Randomly place enemy move from remaining positions on board
function enemyRandom() {
  if(enemyTurn === true){
    var randomMove = Math.floor(Math.random() * aiPositionChoices.length);
    enemyPosition = aiPositionChoices[randomMove];
    squareElement[enemyPosition].innerHTML=players[1];
    squareElement[enemyPosition].className = "square enemyP"
    enemyTurn = false
    console.log("Enemy's turn after making random move is "+ enemyTurn);
  }
}

//Store user and enemy positions in a class array
function createClassArray() {
  for(var i =0; i<squareElement.length; i++){
    classArray.push(squareElement[i].className);
  }
}


// Compare user/enemy class types to winning positions
function checkWinningPosition() {
  for(var i = 0; i<winningPositions.length; i++){
    if(classArray[winningPositions[i][0]] === "square userP"
    && classArray[winningPositions[i][1]] === "square userP"
    && classArray[winningPositions[i][2]] === "square userP"
    && gameFinished === false){
      playerScore += 1;
      document.getElementById("userScore").textContent=playerScore;
      gameFinished = true;
    }else if(classArray[winningPositions[i][0]] === "square enemyP"
    && classArray[winningPositions[i][1]] === "square enemyP"
    && classArray[winningPositions[i][2]] === "square enemyP"
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
  classArray = [];
  showTurn();
}

//Show game status on multiplayer mode
function showTurn() {
  if (document.getElementById("solo").checked === true){
    document.getElementById('turn').innerHTML=""
  }else if (document.getElementById("2-player").checked === true){
    if(gameFinished === true){
      document.getElementById('turn').innerHTML="Round ended"
    }else if(enemyTurn === true){
      document.getElementById('turn').innerHTML="<span style='color: red'>Red turn</span>"
    }else if(enemyTurn === false){
      document.getElementById('turn').innerHTML="<span style='color: green'>Green turn</span>"
    }
  }
}

for(var i=0; i<squareElement.length; i++){
  squareElement[i].addEventListener('click', chooseMode(i));
  squareElement[i].addEventListener('click', createClassArray);
  squareElement[i].addEventListener('click', checkWinningPosition);
  squareElement[i].addEventListener('click', showTurn);
}

document.getElementById("clear").addEventListener('click', clear);
document.getElementById("solo").addEventListener('click', enemyTurn === false);
