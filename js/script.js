'use strict';

//zmienne globalne - przyciski
var paperButton = document.getElementById('paper');
var stoneButton = document.getElementById('stone');
var scissorsButton = document.getElementById('scissors');
var newGameButton = document.getElementById('new-game');

//Pętla dla przycisków
var buttonLoop = document.getElementsByClassName('player-move');

for (var i=0; i<buttonLoop.length; i++) {
  buttonLoop[i].addEventListener('click', function(){
    var buttonAttribute =this.getAttribute("data-move");
    playerMove(buttonAttribute);   
});}

//zmienne globalne - output
var outputScores = document.getElementById('output-scores');
var outputEnd = document.getElementById('output-end');
var outputRound = document.getElementById('output-round');
var outputModal = document.getElementById('output-modal');

//zmienne globalne obiekt
var params = {
  roundsCounter: 0,
  roundsWins: null,
  userPoint: 0,
  computerPoint: 0,
  progress: []
};

var progressModal = params.progress;
var modalTabel = document.getElementById('modal-tabel');

//Modal
//Funkcja wyświetlająca modal
var showModal = function(){
  document.querySelector('#modal-overlay').classList.add('show');
  
  //Funkcja dla output-modal
  if(params.userPoint == params.roundsWins) {
    document.querySelector('.modal').classList.add('win');
    outputModal.innerHTML = '<br><br>' + ' YOU WIN ';  
  }
  else if(params.computerPoint == params.roundsWins) {
    document.querySelector('.modal').classList.add('lose');
    outputModal.innerHTML = '<br><br>' + ' YOU LOSE ';  
  };

  //Funkcja dla modal-tabel
  var headTabel = ['Rounds', 'Your move', 'Computer move', 'Round result', 'Score'];
  
  function createHeadRow(tableData) {
    var rowHeadContainer = document.createElement('tr');
    tableData.forEach(function(value) {
      var column = document.createElement('th');
      column.innerText = value;
      rowHeadContainer.appendChild(column);
    });
    modalTabel.appendChild(rowHeadContainer);
  };

  function createRow(tableData) {
    var rowContainer = document.createElement('tr');
    tableData.forEach(function(value) {
      var column = document.createElement('td');
      column.innerText = value;
      rowContainer.appendChild(column);
    });
    modalTabel.appendChild(rowContainer);
  };

  createHeadRow(headTabel);
  for (var i=0; i<progressModal.length; i++) {
    createRow([
      progressModal[i].id, 
      progressModal[i].playerPlay, 
      progressModal[i].computerPlay, 
      progressModal[i].roundResult, 
      progressModal[i].score
      ]);
  }
};

//funkcja usuwająca tabele
var removeTabel = function() {
    modalTabel.innerHTML = '';
    progressModal = [];
};
// Funkcja ukrywająca modal
var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
    removeTabel();
};


//Przypisanie przycisku i overlay dla f. hideModal  
var closeButtons = document.querySelectorAll('.modal .close');
  
for(var i = 0; i < closeButtons.length; i++){
	closeButtons[i].addEventListener('click', hideModal);
}
   
document.querySelector('#modal-overlay').addEventListener('click', hideModal);


//Srop Propagation  
var modals = document.querySelectorAll('.modal');

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}

//funkcja playerMove (losuje ruch komputer, decyduje o punktach, wyświetla wynik rundy oraz dotychczasowy wynik)
var playerMove = function(type) {
    params.roundsCounter ++;
    var getComputerMove = function() {
      var result = Math.floor(Math.random()*3+1);
        if (result === 1) {result = 'paper';}
        else if (result === 2) {result = 'stone';}
        else if (result === 3) {result = 'scissors';};
      return result;
    };
  
    var computerMove = getComputerMove();
    var userType = type;
    var roundResult;
  
    if (userType == computerMove) {
      outputScores.innerHTML = 'DRAW: you played  ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + '.';
      roundResult = "Draw";}
    else if (userType ==='paper' && computerMove === 'stone') {
      outputScores.innerHTML = 'YOU WON: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :)';
      params.userPoint ++;
      roundResult = "Win";}
    else if (userType === 'paper' && computerMove === 'scissors') {
      outputScores.innerHTML = 'YOU LOSE: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :(';
      params.computerPoint ++;
      roundResult = "Lose";}
    else if (userType === 'stone' && computerMove === 'scissors') {
      outputScores.innerHTML = 'YOU WON: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :)';
      params.userPoint ++;
      roundResult = "Win";}
    else if (userType === 'stone' && computerMove === 'paper') {
      outputScores.innerHTML = 'YOU LOSE: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :(';
      params.computerPoint ++;
      roundResult = "Lose";}
    else if (userType === 'scissors' && computerMove === 'paper') {
      outputScores.innerHTML = 'YOU WON: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :)';
      params.userPoint ++;
      roundResult = "Win";}
    else if (userType === 'scissors' && computerMove === 'stone') {
      outputScores.innerHTML = 'YOU LOSE: you played ' + type.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + ' :(';
      params.computerPoint ++;
      roundResult = "Lose";};
  
    outputEnd.innerHTML = 'Round: ' + params.roundsCounter + ' : ' + 'User: ' + params.userPoint + ' Computer: ' + params.computerPoint ;

    var tabelRoundResult;
    if (roundResult == "Win") {tabelRoundResult = "You WIN"}
      else if (roundResult == "Lose") {tabelRoundResult = "You LOSE"}
      else {tabelRoundResult = "DRAW"};

    progressModal.push({
      id: params.roundsCounter,
      playerPlay: userType,
      computerPlay: computerMove,
      roundResult: tabelRoundResult,
      score: [params.userPoint, params.computerPoint]
    });

    console.log(progressModal);
    if(params.userPoint == params.roundsWins || params.computerPoint == params.roundsWins){
      showModal();
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
  
  document.querySelector('.modal').classList.remove('win');
  document.querySelector('.modal').classList.remove('lose');
  document.getElementById('output-scores').value = null;
};

//funkcja zatrzymująca gre
var finishGame = function() {
  var buttonHide = document.getElementById('container-button');
  buttonHide.classList.add('hide');
  
  var buttonShow = document.getElementById('new-game');
  buttonShow.classList.add('new-game');
  buttonShow.classList.remove('hide');
  
  params.roundsCounter = 0;
  params.userPoint = 0;
  params.computerPoint = 0;
};

//własność dla przycisku new-game
newGameButton.addEventListener('click', function(){
    params.roundsWins = window.prompt('How many won rounds will the game end?');
    outputRound.innerHTML = 'Winning ' + params.roundsWins + ' rounds means victory!' ;
    if (params.roundsWins > 0) {startGame();}
    else {outputRound.innerHTML = 'Incorrect data';};
});