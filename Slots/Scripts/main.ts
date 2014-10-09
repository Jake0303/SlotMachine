var stage = new createjs.Stage(document.getElementById("canvas"));
var slotBackgroundUI = new createjs.Bitmap("../img/slotmachineUI.jpg");
var betMaxButton = new createjs.Bitmap("../img/betmaxbutton.png");
var betOneButton = new createjs.Bitmap("../img/betonebutton.png");
var resetButton = new createjs.Bitmap("../img/resetbutton.png");
var spinButton = new createjs.Bitmap("../img/spinbutton.png");
var reel1 = new createjs.Bitmap("../img/reel.jpg");
var reel2 = new createjs.Bitmap("../img/reel.jpg");
var reel3 = new createjs.Bitmap("../img/reel.jpg");


function init() {
    stage.addChild(slotBackgroundUI);
    stage.addChild(betMaxButton);
    stage.addChild(betOneButton);
    stage.addChild(resetButton);
    stage.addChild(spinButton);
    stage.addChild(reel1);
    stage.addChild(reel2);
    stage.addChild(reel3);

    spinButton.x = 350;
    spinButton.y = 420;

    betMaxButton.x = 150;
    betMaxButton.y = 420;

    betOneButton.x = 100;
    betOneButton.y = 420;

    resetButton.x = 50;
    resetButton.y = 422;
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);

}

function handleTick() {
    stage.update();
    
}