//variables
  var array = [],
  strict = false,
  arrayCheck = [],
  turn = 0,
  divs = ["green", "red", "yellow", "blue"],
  j = 0,
  greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");


//functions
function normalDisplay() {
  $("#green").css("background", "#2ecc71");
  $("#red").css("background", "#e74c3c");
  $("#yellow").css("background", "#f1c40f");
  $("#blue").css("background", "#3498db");
}

function random() {
  turn++;
  $("#white").text(turn);
  var length = $(".col-xs-6").length;
  var random = Math.floor(Math.random() * length);
  array.push(divs[random]);
  displaySet(array);
}

function currentDisplay(color) {
  switch (color) {
    case "green":
      $("#green").css("background", "#29b865");
      greenAudio.play();
      break;
    case "red":
      $("#red").css("background", "#c0392b");
      redAudio.play();
      break;
    case "yellow":
      $("#yellow").css("background", "#f39c12");
      yellowAudio.play();
      break;
    case "blue":
      $("#blue").css("background", "#2980b9");
      blueAudio.play();
      break;
  }
  window.setTimeout(function() {
    normalDisplay();
  }, 200);
}

function displaySet(array) {
  var i = 0;
  var interval = setInterval(function() {
    currentDisplay(array[i]);
    i++;
    if (i >= array.length) {
      clearInterval(interval);
    }
  }, 650);
}

function checkIds() {
  $(".col-xs-6").click(function() {
    var ID = $(this).attr("id");
    currentDisplay(ID);
    arrayCheck.push(ID);
    // if wrong button unbind and display error
    if (ID !== array[j]) {
      j = 0;
      $("#white").text("X");
      $(".col-xs-6").unbind();
      if(strict){
        return false;
      }
      setTimeout(function() {
        $("#white").text(turn);
        displaySet(array);
        checkIds();
      }, 1000);

    } else if (typeof array[20] !== 'undefined'){
      $(".col-xs-6").unbind();
      $(".text").show();

    } else if(typeof array[j+1] === 'undefined'){
      $(".col-xs-6").unbind();
      setTimeout(function() {
        j=0;
        random();
        checkIds();
      }, 1000);
    }
    else{
      j++;
    }
  });
}

function reset(){
  normalDisplay();
  $("div:not(.btn)").unbind();
  array = []; turn = 0; j = 0; arrayCheck = [];
  $(".text").hide();
  random();
  displaySet(array);
  checkIds();
}

//doc ready
$(document).ready(function(){

$(".start").click(function() {
  strict = false;
  reset();
});

$(".strict").click(function(){
  strict = true;
  reset();
});

});
