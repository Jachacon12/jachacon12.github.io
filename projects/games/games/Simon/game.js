// Global Variables

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
//
var started = false;
var level = 0;


var userChosenColor;

////////////////////////////
$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
  else {
    startOver();
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  }
});
////////////////////////

// function chosePatern (){
$(".btn").on("click", function() {

  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);


  playSound(userChosenColor);
  animatedPress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

///////////////////////////
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success compadre");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
      // playSound(userChosenColor);
    }
  } else {
    userChosenColor = "wrong";
    playSound(userChosenColor);
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");


    // $(document).keypress( function() {
    //   // var keypress = ;
    //   setTimeout(function() {
    //     startOver(this.key);
    //   }, 2);

    // });
    console.log("wrong buddy");
  }
}
///////////////////////////// Functions////////////////////
// Creating Random Number
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
// // This is just to test both functionalities

function startOver(key) {
  level = 0;
  gamePattern = [];
  started = false;
}

// Function to make Sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Function for the animation
function animatedPress(userChosenColor) {
  $("#" + userChosenColor).addClass("pressed");

  setTimeout(function() {
    $("#" + userChosenColor).removeClass("pressed");
  }, 100);
}
