const buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;

var level = 0;

$(".btn").click(handler);

$(document).keypress(function(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})

function handler(event){
    chosenColor = event.target.id;
    userClickedPattern.push(chosenColor);

    playSound(chosenColor);
    buttonAnimation(chosenColor);

    checkAnswer(userClickedPattern.length - 1);

    
    console.log(chosenColor);
    
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor); 
    showNextMove(randomChosenColor);
}

function showNextMove(color){
    buttonAnimation(color);
    playSound(color);            
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over! Press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        startOver();
    }
}

function startOver(){
    
    level = 0;
    gamePattern = [];
    started = false;
    
}


function buttonAnimation(currentColor){
    var activeButton = $("#" + currentColor);
    activeButton.addClass("pressed");
    setTimeout(function(){
        activeButton.removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

