
var gamePlaying, activePlayer, roundScore, scores, dicePrev;


init(); //function to initialise all variables, styles

document.querySelector('.btn-roll').addEventListener('click',function(){
    
    if (gamePlaying) {
       //random number
       var dice = Math.floor(Math.random() *6) + 1;
       var dice1 = Math.floor(Math.random() *6) + 1;
        console.log(dice);
        console.log(dice1);
        
       //dice displays random number
       var diceDOM = document.querySelector('.dice');
       diceDOM.style.display = 'block';
       diceDOM.src = 'dice-' + dice + '.png'
        
       var diceDOM1 = document.querySelector('.dice1');
       diceDOM1.style.display = 'block';
       diceDOM1.src = 'dice-' + dice1 + '.png';
        
       if ((dice === 6) && (dicePrev === 6)){
              scores[activePlayer] = 0;
           //   roundScore = 0;
              console.log('yes');
          //    document.getElementById('current-' + activePlayer).textContent = '0';
              document.getElementById('score-' + activePlayer).textContent = '0';
              nextPlayer();
        } else if (dice!==1 && dice1!==1) {
              roundScore += dice + dice1;  //current score gets updated
              document.querySelector('#current-' + activePlayer).textContent = roundScore;
          } else {
       //next player  
          nextPlayer();
     }
        dicePrev = dice;      
   }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
        //Add current score to global score
    scores[activePlayer] += roundScore;
    
    //Update UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      
    var input = document.querySelector('.winscore').value;
    var winningScore;
    
      //Undefined, null, "", 0 are coerced to false. Anything else is coerced to true
    if (input){
         winningScore = input;
    } else {
         winningScore = 100;
    }
    
    //check if player won the game
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
      //change the active player and update UI
      nextPlayer();
    }   
  }    
});


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    gamePlaying = true;
    roundScore = 0;
    activePlayer = 0;
    scores = [0,0];
    dicePrev = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('score-0').textContent = '0'; //querySelector - to select html elements  
    document.getElementById('score-1').textContent = '0'; //getElementById - to select hyml elements using ID. this is faster
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';   
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer(){
         activePlayer === 0? activePlayer = 1: activePlayer = 0;
         roundScore = 0;
         document.getElementById('current-0').textContent = '0';
         document.getElementById('current-1').textContent = '0';
          
         document.querySelector('.player-0-panel').classList.toggle('active'); //toggle adds class if not present and removes class if present.
         document.querySelector('.player-1-panel').classList.toggle('active');
          
         document.querySelector('.dice').style.display = 'none';
         document.querySelector('.dice1').style.display = 'none';
};