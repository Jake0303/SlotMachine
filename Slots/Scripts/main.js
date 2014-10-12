var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;



var stage = new createjs.Stage(document.getElementById("canvas"));
var slotBackgroundUI = new createjs.Bitmap("./img/slotmachineUI.jpg");
var betMaxButton = new createjs.Bitmap("./img/betmaxbutton.png");
var betOneButton = new createjs.Bitmap("./img/betonebutton.png");
var resetButton = new createjs.Bitmap("./img/resetbutton.png");
var spinButton = new createjs.Bitmap("./img/spinbutton.png");

var betMaxClick = new createjs.Bitmap("./img/betmaxglossy.png");
var betOneClick = new createjs.Bitmap("./img/betoneglossy.png");
var resetClick = new createjs.Bitmap("./img/resetglossy.png");
var spinClick = new createjs.Bitmap("./img/spinglossy.png");

var reel1 = new createjs.Bitmap("./img/reel.jpg");
var reel2 = new createjs.Bitmap("./img/reel.jpg");
var reel3 = new createjs.Bitmap("./img/reel.jpg");

var bananaImage = [new createjs.Bitmap("./img/banana.jpg"), new createjs.Bitmap("./img/banana.jpg"), new createjs.Bitmap("./img/banana.jpg")];
var barImage = [new createjs.Bitmap("./img/bar.jpg"), new createjs.Bitmap("./img/bar.jpg"), new createjs.Bitmap("./img/bar.jpg")];
var bellImage = [new createjs.Bitmap("./img/bell.jpg"), new createjs.Bitmap("./img/bell.jpg"), new createjs.Bitmap("./img/bell.jpg")];
var cherryImage = [new createjs.Bitmap("./img/cherries.jpg"), new createjs.Bitmap("./img/cherries.jpg"), new createjs.Bitmap("./img/cherries.jpg")];
var grapeImage = [new createjs.Bitmap("./img/grape.jpg"), new createjs.Bitmap("./img/grape.jpg"), new createjs.Bitmap("./img/grape.jpg")];
var orangeImage = [new createjs.Bitmap("./img/orange.jpg"), new createjs.Bitmap("./img/orange.jpg"), new createjs.Bitmap("./img/orange.jpg")];
var sevenImage = [new createjs.Bitmap("./img/seven.jpg"), new createjs.Bitmap("./img/seven.jpg"), new createjs.Bitmap("./img/seven.jpg")];

var displayBet = new createjs.Text("Bet:" + playerBet, "16px Arial", "#ff7700");
var displayMoney = new createjs.Text("Cash:" + playerMoney, "16px Arial", "#ff7700");
var displayWins = new createjs.Text("Wins:" + winNumber, "16px Arial", "#ff7700");
var displayLosses = new createjs.Text("Losses:" + lossNumber, "16px Arial", "#ff7700");
var displayJackpot = new createjs.Text("Jackpot:" + jackpot, "16px Arial", "#ff7700");


var clickedBetMax = false, clickedBetOne = false, clickedReset = false, clickedSpin = false;
var timer = 0;

function init() {
    for (var i = 0; i < 3; i++) {
        grapeImage[i].scaleX = 0.8;
        grapeImage[i].scaleY = 0.8;
        cherryImage[i].scaleX = 0.8;
        cherryImage[i].scaleY = 0.8;
        bananaImage[i].scaleX = 0.8;
        bananaImage[i].scaleY = 0.8;
        barImage[i].scaleX = 0.8;
        barImage[i].scaleY = 0.8;
        sevenImage[i].scaleX = 0.8;
        sevenImage[i].scaleY = 0.8;
        bellImage[i].scaleX = 0.8;
        bellImage[i].scaleY = 0.8;
        orangeImage[i].scaleX = 0.8;
        orangeImage[i].scaleY = 0.8;
    }

    stage.enableMouseOver(20);

    stage.addChild(slotBackgroundUI);
    stage.addChild(betMaxButton);
    stage.addChild(betOneButton);
    stage.addChild(resetButton);
    stage.addChild(spinButton);
    stage.addChild(reel1);
    stage.addChild(reel2);
    stage.addChild(reel3);
    stage.addChild(displayBet);
    stage.addChild(displayMoney);
    stage.addChild(displayWins);
    stage.addChild(displayLosses);
    stage.addChild(displayJackpot);

    displayBet.x = 60;
    displayBet.y = 80;

    displayMoney.x = 275;
    displayMoney.y = 80;

    displayWins.x = 60;
    displayWins.y = 100;

    displayLosses.x = 275;
    displayLosses.y = 100;

    displayJackpot.x = 170;
    displayJackpot.y = 125;

    reel1.x = 60;
    reel1.y = 225;

    reel2.x = 170;
    reel2.y = 225;

    reel3.x = 280;
    reel3.y = 225;

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

    spinButton.addEventListener("mouseover", function () {
        if (playerBet > 0) {
            spinButton.alpha = 0.5;
            document.body.style.cursor = 'pointer';
        }
        else if (playerBet <= 0) {
            document.body.style.cursor = 'not-allowed';
            stage.canvas.title = 'Please enter a bet to spin.';
            spinButton.removeEventListener("click", handleClick);
        }
        else if (playerMoney <= 0) {
            document.body.style.cursor = 'not-allowed';
            stage.canvas.title = 'Your have no money!';
            spinButton.removeEventListener("click", handleClick);
        }
        stage.update();
    });
    spinButton.addEventListener("rollout", function () {
        spinButton.alpha = 1;
        document.body.style.cursor = 'default';
        stage.canvas.title = ''
        stage.update();
    });

    spinButton.addEventListener("click", handleClick);

    resetButton.addEventListener("mouseover", function () {
        resetButton.alpha = 0.5;
        document.body.style.cursor = 'pointer';
        stage.update();
    });
    resetButton.addEventListener("rollout", function () {
        resetButton.alpha = 1;
        document.body.style.cursor = 'default';
        stage.update();
    });
    resetButton.addEventListener("click", function () {
        resetAll();
        stage.addChild(reel1);
        stage.addChild(reel2);
        stage.addChild(reel3);

        reel1.x = 60;
        reel1.y = 225;

        reel2.x = 170;
        reel2.y = 225;

        reel3.x = 280;
        reel3.y = 225;
        stage.removeChild(resetButton);
        stage.addChild(resetClick);
        resetClick.x = 50;
        resetClick.y = 422;
        clickedReset = true;
    });


    betMaxButton.addEventListener("mouseover", function () {
        betMaxButton.alpha = 0.5;
        document.body.style.cursor = 'pointer';
        stage.update();
    });
    betMaxButton.addEventListener("rollout", function () {
        betMaxButton.alpha = 1;
        document.body.style.cursor = 'default';
        stage.update();
    });
    betMaxButton.addEventListener("click", function () {
        if (playerBet <= playerMoney) {
            stage.removeChild(betMaxButton);
            stage.addChild(betMaxClick);
            betMaxClick.x = 150;
            betMaxClick.y = 420;
            playerBet += playerMoney;
            clickedBetMax = true;
        }
        else {
            alert('You cannot bet more than what you have');
        }
    });

    betOneButton.addEventListener("mouseover", function () {
        betOneButton.alpha = 0.5;
        document.body.style.cursor = 'pointer';
        stage.update();
    });
    betOneButton.addEventListener("rollout", function () {
        betOneButton.alpha = 1;
        document.body.style.cursor = 'default';
        stage.update();
    });
    betOneButton.addEventListener("click", function () {
        if (playerBet <= playerMoney) {
            stage.removeChild(betOneButton);
            stage.addChild(betOneClick);
            betOneClick.x = 100;
            betOneClick.y = 420;
            playerBet += 1;
            clickedBetOne = true;
        }
        else {
            alert('You cannot bet more than what you have');
        }
    });
    
}

function handleClick() {
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
    $("div#result>p").text(fruits);
    determineWinnings();
    turn++;
    showPlayerStats();

    stage.removeChild(spinButton);
    stage.addChild(spinClick);
    spinClick.x = 350;
    spinClick.y = 420;
    clickedSpin = true;
}

function handleTick() {
    
    displayBet.text = "Bet:" + playerBet;
    displayMoney.text = "Cash:" + playerMoney;
    displayWins.text = "Wins:" + winNumber;
    displayLosses.text = "Losses:" + lossNumber;
    displayJackpot.text = "Jackpot:" + jackpot;

    if (playerBet > 0 && playerMoney > 0) {
        spinButton.addEventListener("click", handleClick);
    }
    else if (playerMoney <= 0) {
        playerMoney = 0;
        document.body.style.cursor = 'not-allowed';
        stage.canvas.title = 'Your have no money! Click reset or exit the game.';
        spinButton.removeEventListener("click", handleClick);
    }
    if (playerBet <= 0)
    {
        spinButton.removeEventListener("click", handleClick);

    }

    if (clickedSpin) {
        timer += 1;

        if (timer > 20) {
            stage.removeChild(spinClick);
            stage.addChild(spinButton);
            spinButton.x = 350;
            spinButton.y = 420;
            timer = 0;
            clickedSpin = false;
        }
    }
    else if (clickedBetMax)
        timer += 1;

    if (timer > 20) {
        stage.removeChild(betMaxClick);
        stage.addChild(betMaxButton);
        betMaxButton.x = 150;
        betMaxButton.y = 420;
        timer = 0;
        clickedBetMax = false;
    }
    else if (clickedBetOne)
        timer += 1;

    if (timer > 20) {
        stage.removeChild(betOneClick);
        stage.addChild(betOneButton);
        betOneButton.x = 100;
        betOneButton.y = 420;
        timer = 0;
        clickedBetOne = false;
    }
    else if (clickedReset)
        timer += 1;

    if (timer > 20) {
        stage.removeChild(resetClick);
        stage.addChild(resetButton);
        resetButton.x = 50;
        resetButton.y = 422;
        timer = 0;
        clickedReset = false;
    }
    stage.update();
}

/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
    clickedBetMax = false, clickedBetOne = false, clickedReset = false, clickedSpin = false;
    timer = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    jackpot += +playerBet;
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                if (spin == 0) {
                    stage.addChild(reel1);
                    reel1.x = 60;
                    reel1.y = 225;

                }
                else if (spin == 1) {
                    stage.addChild(reel2);
                    reel2.x = 170;
                    reel2.y = 225;

                }
                else if (spin == 2) {
                    stage.addChild(reel3);
                    reel3.x = 280;
                    reel3.y = 225;

                }
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                stage.addChild(grapeImage[spin]);
                if (spin == 0) {
                    grapeImage[spin].x = 70;
                    grapeImage[spin].y = 235;

                }
                else if (spin == 1) {
                    grapeImage[spin].x = 180;
                    grapeImage[spin].y = 235;

                }
                else if (spin == 2) {
                    grapeImage[spin].x = 290;
                    grapeImage[spin].y = 235;

                }
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                if (spin == 0) {
                    stage.addChild(bananaImage[spin]);
                    bananaImage[spin].x = 70;
                    bananaImage[spin].y = 235;

                }
                else if (spin == 1) {
                    stage.addChild(bananaImage[spin]);
                    bananaImage[spin].x = 180;
                    bananaImage[spin].y = 235;

                }
                else if (spin == 2) {
                    stage.addChild(bananaImage[spin]);
                    bananaImage[spin].x = 290;
                    bananaImage[spin].y = 235;

                }
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                if (spin == 0) {
                    stage.addChild(orangeImage[spin]);
                    orangeImage[spin].x = 70;
                    orangeImage[spin].y = 235;

                }
                else if (spin == 1) {
                    stage.addChild(orangeImage[spin]);
                    orangeImage[spin].x = 180;
                    orangeImage[spin].y = 235;

                }
                else if (spin == 2) {
                    stage.addChild(orangeImage[spin]);
                    orangeImage[spin].x = 290;
                    orangeImage[spin].y = 235;

                }
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                if (spin == 0) {
                    stage.addChild(cherryImage[spin]);
                    cherryImage[spin].x = 70;
                    cherryImage[spin].y = 235;

                }
                else if (spin == 1) {
                    stage.addChild(cherryImage[spin]);
                    cherryImage[spin].x = 180;
                    cherryImage[spin].y = 235;

                }
                else if (spin == 2) {
                    stage.addChild(cherryImage[spin]);
                    cherryImage[spin].x = 290;
                    cherryImage[spin].y = 235;

                }
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                if (spin == 0) {
                    stage.addChild(barImage[spin]);
                    barImage[spin].x = 69;
                    barImage[spin].y = 235;

                }
                else if (spin == 1) {
                    stage.addChild(barImage[spin]);
                    barImage[spin].x = 179;
                    barImage[spin].y = 235;

                }
                else if (spin == 2) {
                    stage.addChild(barImage[spin]);
                    barImage[spin].x = 289;
                    barImage[spin].y = 235;

                }
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                if (spin == 0) {
                    stage.addChild(bellImage[spin]);
                    bellImage[spin].x = 68;
                    bellImage[spin].y = 235;

                }
                else if (spin == 1) {
                    stage.addChild(bellImage[spin]);
                    bellImage[spin].x = 178;
                    bellImage[spin].y = 235;

                }
                else if (spin == 2) {
                    stage.addChild(bellImage[spin]);
                    bellImage[spin].x = 288;
                    bellImage[spin].y = 235;

                }
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                if (spin == 0) {
                    stage.addChild(sevenImage[spin]);
                    sevenImage[spin].x = 70;
                    sevenImage[spin].y = 234;

                }
                else if (spin == 1) {
                    stage.addChild(sevenImage[spin]);
                    sevenImage[spin].x = 180;
                    sevenImage[spin].y = 234;

                }
                else if (spin == 2) {
                    stage.addChild(sevenImage[spin]);
                    sevenImage[spin].x = 290;
                    sevenImage[spin].y = 234;

                }
                bars++;
                break;

        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}

/* When the player clicks the spin button the game kicks off */
$("#spinButton").click(function () {

    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        $("div#result>p").text(fruits);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }

});

function endGame()
{
    
    stage.removeAllChildren();
    
    
}
