$(document).ready(function() {
  console.log('goin!')

  $('td').click(setDoctor)
  $('#reset').click(resetGame)
  $('#lets-go').click(startPicking)
  $('#end-close').click(toggleEndModal)
});

let move = 0;
let oneWin = [];
let twoWin = [];
let pOne = "";
let pTwo = "";


//PICKING CHARACTERS
//Allows the users to choose which doctors they want to be
function startPicking(){
  $('.step1').fadeOut()
  setTimeout(function(){ $('.step2').fadeIn() }, 500)
  setPlayerListeners()

}
//Sets up first set of event listeners
function setPlayerListeners(){
  $('.doc').click(chooseFirstDoc)

}
//Events once player 1 picks a doctor
function chooseFirstDoc(){
  $(this).removeClass('doc').addClass('picked');
  pOne = $(this).css('background-image');
  console.log(pOne);
  $('#start-modal-text').text("Player 2, choose your doctor");
  $('.doc').off('click')
  $('.doc').click(chooseSecondDoc);
}
//Events once player 2 picks a doctor
function chooseSecondDoc(){
  $(this).removeClass('doc').addClass('picked');
  pTwo = $(this).css('background-image');
  console.log(pTwo);
  $('.start-modal').fadeOut();
}


//GAME FUNCTION
//Switching turns and notifying platers
function countTurns() {
  if (move % 2 === 1) {
    $('.player').text("Player One's move")
  } else {
    $('.player').text("Player Two's move")
  }
  move++;
};

//Marking which spaces the players have chosen
function setDoctor(){
  if (move % 2 === 0) {
    if($(this).hasClass("unmarked") === true){
      $(this).addClass("p1").removeClass("unmarked").css('background-image', pOne);
      countTurns()
      checkForWin()
    }
  } else {
    if($(this).hasClass("unmarked") === true){
      $(this).addClass("p2").removeClass("unmarked").css('background-image', pTwo);
      countTurns()
      checkForWin()
    }
  }
};

function checkForWin(){
  if(document.querySelectorAll('.row1.p1').length === 3 || document.querySelectorAll('.row2.p1').length === 3 || document.querySelectorAll('.row3.p1').length === 3 || document.querySelectorAll('.col1.p1').length === 3 || document.querySelectorAll('.col2.p1').length === 3 || document.querySelectorAll('.col3.p1').length === 3 || document.querySelectorAll('.dia1.p1').length === 3 || document.querySelectorAll('.dia2.p1').length === 3) {

    console.log("player 1 wins");
    $('.player').text("Player One starts this round.")
    oneWin.push("X")
    fixScore();
    setTimeout(resetBoard(), 1500);
    move = 0;
    $('#announce-win').text("Player One wins this round!")
    toggleEndModal();

  } else if (document.querySelectorAll('.row1.p2').length === 3 || document.querySelectorAll('.row2.p2').length === 3 || document.querySelectorAll('.row3.p2').length === 3 || document.querySelectorAll('.col1.p2').length === 3 || document.querySelectorAll('.col2.p2').length === 3 || document.querySelectorAll('.col3.p2').length === 3 || document.querySelectorAll('.dia1.p2').length === 3 || document.querySelectorAll('.dia2.p2').length === 3) {

    console.log("player 2 wins");
    $('.player').text("Player Two starts this round.")
    twoWin.push("X")
    fixScore();
    setTimeout(resetBoard(), 1500);
    move = 1;
    $('#announce-win').text("Player Two wins this round!")
    toggleEndModal();

  } else if (document.querySelectorAll('.unmarked').length === 0) {

    console.log("it's a tie")
      if(move % 2 === 0){
        $('.player').text("Player One's move")
      } else {
        $('.player').text("Player Two's move")
      }
    setTimeout(resetBoard(), 1500);
    $('#announce-win').text("Looks like it's a tie.")
    toggleEndModal();
  }
}

//Notifies players that the round is over
function toggleEndModal(){
  $('.end-modal').toggle()
}

function fixScore(){
  $('#onescore').text(oneWin.length);
  $('#twoscore').text(twoWin.length);
}

function resetBoard(){
  $('.p1').each(function(){
    $(this).removeClass('p1').addClass("unmarked").css('background-image', '')
  });
  $('.p2').each(function(){
    $(this).removeClass('p2').addClass("unmarked").css('background-image', '')
  })
}


//RESETS GAME
function resetGame(){
  move = 0;
  oneWin = [];
  twoWin = [];
  resetBoard()
  fixScore()
  $('.player').text("Player One starts the game.")
}
