$(function() {

var sessionTime = 25 * 60;
var breakTime = 5 * 60;
var timeLeft = sessionTime;
var timeInterval;
var ticking = false;
var isSession = true;
var sessionNumber = 0;

// ***************************

function sessionCount(){
$('#sessions').html(sessionNumber)  
}
sessionCount();
  
  
$('#switchButton').click(function(){
    switchFunction();
  ticking = false;
});

function switchFunction(){
  stopFunction();
    if (isSession){
        isSession = false;
      $('#switchButton').html("Switch to Session")
    }else{
        isSession = true;
     $('#switchButton').html("Switch to Break")
    }
  $('#stopText').empty();
  $('#startText').html("Start");
  isSessionFunction()
}
  

  
  
  
  

function isSessionFunction(){
    if (isSession === true){
        timeLeft = sessionTime
    } else {
        timeLeft = breakTime
    }
  minsAndSecs();
}
isSessionFunction();

//*****************************************************
function countDown(i) {
    timeInterval = setInterval(function() {
        timeLeft--;
        if (isSession == true && timeLeft <= 0){
          sessionNumber = sessionNumber + 1;
          sessionCount();
        }
        if (timeLeft <= 0){
          ticking = false;
          switchFunction();
          bellSound();
        }

        minsAndSecs();
    }, 1000);
}
//*****************************************************

  function bellSound(){
  var bell = new Audio('http://cordo.free.fr/spf/Sons/DeskBell.wav');
  bell.play();  
  }
  

  
function stopFunction(){
    clearInterval(timeInterval);
}
// **************************


// Stop/Start Function
$('#display').click(function(){
  startStop();
});
                    
function startStop(){
        if (ticking === false){
        countDown(timeLeft);
        ticking = true;
        $('#startText').empty();
        $('#stopText').html("Stop");
    } else {
        stopFunction();
        ticking = false;
        $('#stopText').empty();
        $('#startText').html("Start");

    }


}


$('#addTime').click(function(){
    timeLeft = timeLeft + 60;
  minsAndSecs();
});

$('#reduceTime').click(function(){
    timeLeft = timeLeft - 60;
   
  if (timeLeft <= 60){
  timeLeft = 0
  }
  minsAndSecs();
  
});


// displays time
function minsAndSecs(){
    var minutesLeft = Math.floor(timeLeft/60);
    var secondsLeft = Math.floor(timeLeft%60);

    function secondsFormat(){
        if (secondsLeft < 10){
            return secondsLeft + '0' ;
        } else{
            return secondsLeft;
        }
    }


    $('#time').empty();
    $('#time').append(minutesLeft + ":" + secondsFormat(secondsLeft));

}
minsAndSecs();






$('#reset').click(function(){
    resetFunction();
});

function resetFunction(){
    if (isSession == true){
        timeLeft = 25 * 60
    }
    else{
        timeLeft = 5 * 60; }   
     ticking = false;
        $('#stopText').empty();
        $('#startText').html("Start");
    minsAndSecs();
  stopFunction();
  sessionNumber = 0;
  sessionCount();

}

});


  

