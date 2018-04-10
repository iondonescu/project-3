/*
 * Create a list that holds all of your cards
 */
const card = document.getElementsByClassName('card');
const cards = [...card];
let numberOfMoves;//number of moves
let aClassName=[];// array for maching card
let countOpenCard;//for matching cards
let ulList = document.querySelectorAll('.card i');
let countPairCards;// count the number of match cards
const soundUnmatch = document.getElementById('myAudioUnmatch');//sound for unmatch cards
const soundMatch = document.getElementById('myAudioMatch');//sound for match cards
let restart=document.getElementsByClassName('restart')[0];
let volume = document.querySelectorAll('.volume i');
let time = document.getElementsByClassName('time');
let b=document.getElementsByClassName('moves');//class that display number of moves
let starList=document.querySelectorAll('.stars li');
let sec;
let min;
let interval;
let modal = document.getElementById('myModal');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
/*
 *create an array with classes to be added in each "i" element of the cards list
 */
let catArray=['cardFront1','cardFront1',
              'cardFront2','cardFront2',
              'cardFront3','cardFront3',
              'cardFront4','cardFront4',
              'cardFront5','cardFront5',
              'cardFront6','cardFront6',
              'cardFront7','cardFront7',
              'cardFront8','cardFront8'];
//function time of the Game
function timeBegins() {
   interval = setInterval (function(){
            sec++;
            if(sec == 60){
                min++;
                sec=0;
            }
            time[0].innerHTML ='Time: '+min+' mins '+sec+' sec';
        },1000);
    }

/*
 * if the cards matches give class open and remove class show
 */

function match(){
    let matchCard=document.querySelectorAll('.show');
    matchCard[0].classList.toggle('open');
    matchCard[0].classList.toggle('show');
    matchCard[1].classList.toggle('open');
    matchCard[1].classList.toggle('show');
    countPairCards+=2;
  }
  /*
   * if the cards don't matches give class unmatch(make style to cards), remove class show,remove unmatch
   * and reset with class card;setTimeout is used to synchronize style moves with sounds
   */
function unmatch(){
    if (volume[0].className=='fa fa-volume-up'){soundUnmatch.play();}
    let unmatchCard=document.querySelectorAll('.show');
    unmatchCard[0].classList.add('unmatch');
    unmatchCard[1].classList.add('unmatch');
    unmatchCard[0].classList.remove('show');
    unmatchCard[1].classList.remove('show');
  setTimeout(function(){
    unmatchCard[0].classList.remove('unmatch');
    unmatchCard[1].classList.remove('unmatch');
  },400);
  setTimeout(function(){
    unmatchCard[0].classList.add('cat');
    unmatchCard[1].classList.add('cat');
  },400);
};
/*
* at the end of the game pop up the modal window
*/
function modalWindow(){
    modal.style.display = "block";
    let totalTime=document.getElementsByClassName('totalTime')[0];
    totalTime.innerHTML="TOTAL TIME:"+min+" mins "+sec+" secs ";
    let starRating=document.getElementsByClassName('starRating')[0];
    if (numberOfMoves<30){
      starRating.innerHTML='<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>'
      }
      else {if (numberOfMoves<55){
            starRating.innerHTML='<i class="fa fa-star"></i><i class="fa fa-star"></i>'
            }
                                  else{starRating.innerHTML='<i class="fa fa-star"></i>'
                                  }
          }
    let playAgain=document.getElementsByTagName('button');
    playAgain[0].addEventListener('click',restartGame);
}
/*
 * On click show card. Compare two open card.Count the number of moves with variable "number"
 */
function showCard(){
    let a=this.querySelector('.cat');
    a.classList.remove('cat');
    numberOfMoves++;
    if (numberOfMoves == 1){timeBegins()};
    if (numberOfMoves >= 30){starList[2].style.visibility="hidden"};
    if (numberOfMoves >= 55){starList[1].style.visibility="hidden"};
    b[0].innerHTML=numberOfMoves;
    countOpenCard++;
    a.classList.add('show');
    aClassName.push(a.className);
    if (countOpenCard == 2){
        a.classList.add('show');
        aClassName.push(a.className);
        if (aClassName[0]===aClassName[1]) {
          if(volume[0].className=='fa fa-volume-up'){soundMatch.play();};//play sound match
          match();
          if (countPairCards == 16){
            clearInterval(interval);
            setTimeout(function(){modalWindow()},3000);
          }
        }
          else {unmatch()};
          countOpenCard=0;
          aClassName=[];
      };
  };
  /*
   * if the cards don't matches give class unmatch(make style to cards), remove class show,remove unmatch
   */
function startGame(){
    numberOfMoves=0;
    aClassName=[];
    countOpenCard=0;
    countPairCards=0;
    volume[0].className='fa fa-volume-up';
    sec=0;
    min=0;
    b[0].innerHTML=0;
    shuffle(catArray);
    for (let i=0;i<=cards.length-1;i++){
      ulList[i].classList.add(catArray[i]);
    };
    for (let i=0;i<=cards.length-1;i++){
      cards[i].addEventListener('click',showCard);
    };
};
startGame();

/*
 * function for restarting the Game
 */
function restartGame(){
    clearInterval(interval);
    time[0].innerHTML ='Time: '+0+' mins '+0+' sec';
    for (let i=0;i<=catArray.length-1;i++){
          ulList[i].classList.add('cat');
          ulList[i].classList.remove(catArray[i]);
          ulList[i].classList.remove('show');
          ulList[i].classList.remove('open');
        };
    modal.style.display = "none";
    starList[2].style.visibility='visible';
    starList[1].style.visibility='visible';
    startGame();
}
restart.addEventListener('click',restartGame);

/*
 * event-clicking the volume button change the icon and class
 */
volume[0].addEventListener('click',function(){
  if(volume[0].className=='fa fa-volume-up'){
      volume[0].classList.remove('fa-volume-up');
      volume[0].classList.add('fa-volume-off');
    }
  else {if (volume[0].className='fa fa-volume-off'){
              volume[0].classList.remove('fa-volume-off');}
              volume[0].classList.add('fa-volume-up');
            }
  });

 /* set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
