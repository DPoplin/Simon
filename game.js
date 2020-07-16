var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = "0";


$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  // var userClick = $.inArray((userChosenColor), buttonColors);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success!");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // gamePattern.forEach(animatePress);
  gamePattern.forEach((button, i) => {
    setTimeout(() => {
      animatePress(button);
      playSound(button);
    },i * 500);
  });
  // $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


var gameStarted = "false";
$("body").keydown(function() {
  if (gameStarted === "false") {
    gameStarted = "true";
    nextSequence();
  }
});

function startOver(){
  gamePattern = [];
  level = "0";
  gameStarted = "false";
}
