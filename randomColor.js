var game = {
    gameover: false,
    score: 0,
    num: 6,
    color: [],
    pickedColor: 0,
    clickedColor: 0,
    squares: document.querySelectorAll(".square"),
    colorDisplay: document.querySelector("#colorDisplay"),
    feedbackDisplay: document.querySelector("#feedback"),
    h1: document.querySelector("h1"),
    resetButton: document.querySelector("#reset"),
    modeButtons: document.querySelectorAll(".mode"),
    hardSquares: document.querySelectorAll(".hard"),
    scoreDisplay: document.querySelector("#score"),
    scoreReset: document.querySelector(".scoreReset"),
};

game.init = function () {
    game.setupModeButtons();
    game.setupSquares();
    game.reset();
}
game.setupModeButtons = function () {
    // reset button
    game.resetButton.addEventListener("click", game.reset);
    // reset Score button
    game.scoreReset.addEventListener("click", function () {
        game.resetScore();
    })
    // modeButtons event listener
    for (var i = 0; i < game.modeButtons.length; i++) {
        game.modeButtons[i].addEventListener("click", function () {
            game.resetScore();
            game.modeButtons[0].classList.remove("selected");
            game.modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? game.num = 3 : game.num = 6;
            game.reset();
        })
    }
}
game.setupSquares = function () {
    for (var i = 0; i < game.squares.length; i++) {
        // event listener
        game.squares[i].addEventListener("click", function () {
            game.clickedColor = this.style.backgroundColor;
            if (game.gameover === false) {
                if (game.clickedColor === game.pickedColor) {

                    game.score++;
                    game.scoreDisplay.textContent = game.score;
                    game.feedbackDisplay.textContent = "Correct!!!";
                    // change squares colors
                    game.changeColors(game.clickedColor);
                    // change h1 color tp pickedColor
                    game.h1.style.backgroundColor = game.clickedColor;
                    // change reset button text
                    game.resetButton.textContent = "Play again?";
                    game.gameover = true;
                } else {
                    game.score = 0;
                    game.scoreDisplay.textContent = game.score;
                    game.feedbackDisplay.textContent = "Try Again...";
                    this.style.backgroundColor = "#2f4f4f";
                }
            }
        })
    }
}
game.changeColors = function (color) {
    for (var i = 0; i < game.squares.length; i++) {
        game.squares[i].style.backgroundColor = color;
    }
}
game.reset = function () {
    game.gameover = false;
    // generate random colors
    game.colors = game.generateRandomColors();
    // pick a random color
    game.pickedColor = game.pickColor();
    // display picked collor
    game.colorDisplay.textContent = game.pickedColor;
    // change color of squares
    for (var i = 0; i < game.squares.length; i++) {
        if (game.colors[i]) {
            // initial colors
            game.squares[i].style.display = "block";
            game.squares[i].style.backgroundColor = game.colors[i];
        } else {
            game.squares[i].style.display = "none";
        }

    };
    // revert h1 backgroundColor
    game.h1.style.backgroundColor = "steelblue";
    // revert reset button text
    game.resetButton.textContent = "New Colors";
    // revert feedbackDisplay
    game.feedbackDisplay.textContent = "";
}
game.generateRandomColors = function () {
    var arr = [];

    for (var i = 0; i < game.num; i++) {

        arr.push(game.randomColor());
    }

    return arr;
}
game.pickColor = function () {
    var random = Math.floor(Math.random() * game.colors.length);
    return game.colors[random];
}
game.randomColor = function () {
    // pick red
    var r = Math.floor(Math.random() * 256);
    // pick green
    var g = Math.floor(Math.random() * 256);
    // pick blue
    var b = Math.floor(Math.random() * 256);

    return ("rgb(" + r + ", " + g + ", " + b + ")");
}
game.resetScore = function(){
    game.score = 0;
    game.scoreDisplay.textContent = game.score;
}

game.init();