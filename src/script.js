'use strict';

//zmienne globalne - przyciski
var paperButton = document.getElementById('paper');
var stoneButton = document.getElementById('stone');
var scissorsButton = document.getElementById('scissors');
var newGameButton = document.getElementById('new-game');

//Własności dla przycisków
paperButton.addEventListener('click', function(){
      playerMove('paper');
});
stoneButton.addEventListener('click', function(){
      playerMove('stone');
});
scissorsButton.addEventListener('click', function(){
      playerMove('scissors');
});

//zmienne globalne - output
var outputScores = document.getElementById('output-scores');
var outputEnd = document.getElementById('output-end');
var outputRound = document.getElementById('output-round');

//zmienne globalne
var roundsCounter = 0;
var roundsWins;
var userPoint = 0;
var computerPoint = 0;

//funkcja playerMove (losuje ruch komputer, decyduje o punktach, wyświetla wynik rundy oraz dotychczasowy wynik)
var playerMove = function(type) {
    roundsCounter ++;
    var getComputerMove = function() {
      var result = Math.floor(Math.random()*3+1);
        if (result === 1) {result = 'paper';}
        else if (result === 2) {result = 'stone';}
        else if (result === 3) {result = 'scissors';};
      return result;
    };
  
    var computerMove = getComputerMove();
    var userType = type;
  
    if (userType == computerMove) {
      outputScores.innerHTML = 'DRAW: you played  ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + '.';}
    else if (userType ==='paper' && computerMove === 'stone') {
      outputScores.innerHTML = 'YOU WON: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :)';
      userPoint ++;}
    else if (userType === 'paper' && computerMove === 'scissors') {
      outputScores.innerHTML = 'YOU LOSE: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :(';
      computerPoint ++;}
    else if (userType === 'stone' && computerMove === 'scissors') {
      outputScores.innerHTML = 'YOU WON: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :)';
      userPoint ++;}
    else if (userType === 'stone' && computerMove === 'paper') {
      outputScores.innerHTML = 'YOU LOSE: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :(';
      computerPoint ++;}
    else if (userType === 'scissors' && computerMove === 'paper') {
      outputScores.innerHTML = 'YOU WON: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :)';
      userPoint ++;}
    else if (userType === 'scissors' && computerMove === 'stone') {
      outputScores.innerHTML = 'YOU LOSE: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :(';
      computerPoint ++;};
  
    outputEnd.innerHTML = 'Round: ' + roundsCounter + ' : ' + 'User: ' + userPoint + ' Computer: ' + computerPoint ;
  
    if(userPoint == roundsWins || computerPoint == roundsWins){
      if(userPoint == roundsWins) {
        outputEnd.innerHTML = 'Round: ' + roundsCounter + ' : ' + 'User: ' + userPoint + ' Computer: ' + computerPoint + '<br><br>' + ' YOU WIN ';  
      }
      else if(computerPoint == roundsWins) {
        outputEnd.innerHTML = 'Round: ' + roundsCounter + ' : ' + 'User: ' + userPoint + ' Computer: ' + computerPoint + '<br><br>' + ' YOU LOSE ';  
      };
    finishGame();
    };
};

//funkcja uruchamiająca gre
var startGame = function() {
  var buttonShow = document.getElementById('container-button');
    buttonShow.classList.add('container-button');
    buttonShow.classList.remove('hide');
  var buttonHide = document.getElementById('new-game');
    buttonHide.classList.remove('new-game');
    buttonHide.classList.add('hide');
  document.getElementById('output-scores').value = null;
};

//funkcja zatrzymująca gre
var finishGame = function() {
  var buttonHide = document.getElementById('container-button');
    buttonHide.classList.remove('container-button');
    buttonHide.classList.add('hide');
  var buttonShow = document.getElementById('new-game');
    buttonShow.classList.add('new-game');
    buttonShow.classList.remove('hide');
  roundsCounter = 0;
  userPoint = 0;
  computerPoint = 0;
}

//własność dla przycisku new-game
newGameButton.addEventListener('click', function(){
  	roundsWins = window.prompt('How many won rounds will the game end?');
    outputRound.innerHTML = 'Winning ' + roundsWins + ' rounds means victory!' ;
    if (roundsWins > 0) {startGame();}
    else {outputRound.innerHTML = 'Incorrect data';};
}); 

