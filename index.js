var buttonColors =["darkolivegreen","orange","darkmagenta","black"];

var gamePattern=[];

var userClickedPattern=[];

var started=false;
var level=0;

$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});



function nextSequence(){
    userClickedPattern=[];
    level++
    $("#level-title").text("Level "+level);
    var randomVariable=Math.floor(Math.random()*4);

    var randomChoosenColor=buttonColors[randomVariable];

    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).animate({opacity: 0.5},100).animate({opacity: 1},100);

    playSound(randomChoosenColor);
}

$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);

    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(name){
  var audio=new Audio("./sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}






