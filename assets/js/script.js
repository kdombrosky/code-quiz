// global variables
var timeLimit = 75; 
var quizIndex = 0;
var highscores = [];
var oldHighscores = [];

// initial page content
var timerEl = document.querySelector("#timer");
var viewScoresEl = document.querySelector("#view-scores");
var headContentEl = document.querySelector("#head-content");
var contentEl = document.querySelector("#content");
var answerContainerEl = document.querySelector("#answer-btns");
var answerValueContainerEl = document.querySelector("#answer-value");
var endGameContainerEl = document.querySelector("#end-game");

// array for question objects
const quizArray = [
    {
        question: "Commonly used data types do NOT include:",
        answers: [
            { a: "1. Alerts" , correctAnswer: true},
            { a: "2. Booleans" , correctAnswer: false},
            { a: "3. Strings" , correctAnswer: false},
            { a: "4. Numbers" , correctAnswer: false}
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed with ______.",
        answers: [
            { a: "1. Quotes" , correctAnswer: false},
            { a: "2. Curly Brackets" , correctAnswer: false},
            { a: "3. Parenthesis" , correctAnswer: true},
            { a: "4. Square Brackets" , correctAnswer: false}
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answers: [
            { a: "1. Numbers and Strings" , correctAnswer: false},
            { a: "2. Other arrays" , correctAnswer: false},
            { a: "3. Booleans" , correctAnswer: false},
            { a: "4. All of the above" , correctAnswer: true}
        ]
    },
    {
        question: "String values must be closed within ______ when being assigned to variables",
        answers: [
            { a: "1. Commas" , correctAnswer: false},
            { a: "2. Curly brackets" , correctAnswer: false},
            { a: "3. Quotes" , correctAnswer: true},
            { a: "4. Parenthesis" , correctAnswer: false}
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { a: "1. JavaScript" , correctAnswer: false},
            { a: "2. Terminal/Bash" , correctAnswer: false},
            { a: "3. for loops" , correctAnswer: false},
            { a: "4. console.log" , correctAnswer: true}
        ]
    },
    
];
//------------------------------------ End Declarations ------------------------------------------
// function to reset content
var resetContent = function() {
    contentEl.innerHTML = "";
    timeLimit = 75;
    quizIndex = 0;
};

// function to clear content for in game
var clearContent = function() {
    // remove button elements if they exist
    while(answerContainerEl.firstChild) {
        answerContainerEl.removeChild(answerContainerEl.firstChild);
    }

    // remove appended correct/wrong value
    while(answerValueContainerEl.firstChild) {
        answerValueContainerEl.removeChild(answerValueContainerEl.firstChild);
    }

    // remove end game children
    while(endGameContainerEl.firstChild) {
        endGameContainerEl.removeChild(endGameContainerEl.firstChild);
    }
};

// function to countdown from timer
var startTimer = function() {
    // timer function decrements every second
    var countdown = setInterval(function() {
        if((quizIndex) === quizArray.length) {
            clearInterval(countdown);
            return;
        } else if(timeLimit >= 1) {
            timerEl.textContent = timeLimit;
            timeLimit--;
        } else {
            timerEl.textContent = "0";
            clearInterval(countdown);
            endGame();
            return;
        }
    }, 1000);
};

// function to process selected answer and then once again call populateQuestion()
var selectedAnswer = function(event) {
    clearContent();
    // check if answer selected has an attribute
    var confirmCorrectAnswer = event.target.hasAttribute("data-confirm");
    quizIndex++;

    if(confirmCorrectAnswer) {
        // show answer value in answerValueContainerEl
        var answerValue = document.createElement("p");
        answerValue.innerText = "Correct!";
        answerValueContainerEl.appendChild(answerValue);
    } else {
        //subtract value from timer! 
        timeLimit = timeLimit - 10;
        // show answer value in answerValueContainerEl
        var answerValue = document.createElement("p");
        answerValue.innerText = "Wrong!";
        answerValueContainerEl.appendChild(answerValue);
    };
    
    populateQuestion();
};

// function to populate questions and answers! 
var populateQuestion = function() {
    // check if there are questions left
    if((quizIndex) === quizArray.length) {
        endGame();
        return;
    };
    
    // populate question
    headContentEl.textContent = quizArray[quizIndex].question;
    // populate answers
    quizArray[quizIndex].answers.forEach(answer => {
        var answerBtn = document.createElement("button");
        answerBtn.textContent = answer.a;
        answerBtn.className = "btn";
        answerContainerEl.appendChild(answerBtn);
        // if correctAnswer = true, add custom attribute
        if (answer.correctAnswer) {
            answerBtn.setAttribute("data-confirm", true);
        };

        answerBtn.addEventListener("click", selectedAnswer);
    });
};

// function to start game!
var startQuiz = function() {
    resetContent();
    startTimer();
    populateQuestion();
};

// function to load initial files
var loadContent = function() {
    // set and reset initial values
    clearContent();
    resetContent();

    // populate with initial instructions
    headContentEl.textContent = "Coding Quiz Challenge";
    
    var instructions = document.createElement("p");
    instructions.innerHTML = "Try to answer the following code-related questions within the time limit. <br/> Keep in mind that incorrect answers will penalize your score/time <br/> by ten seconds!";

    var startBtn = document.createElement("button");
    startBtn.textContent = "Start Quiz";
    startBtn.className = "btn";

    contentEl.appendChild(instructions);
    contentEl.appendChild(startBtn);

    startBtn.addEventListener("click", startQuiz);
};

//------------------------------------ End Game Below ----------------------------------------
// Saving score functions run bottom to top

// function to load highscores from localstorage
var loadScores = function() {
    resetContent();
    clearContent();
    // retrieve tasks from localStorage
    var savedScores = [];
    savedScores = localStorage.getItem("highscores");

    // convert tasks from string back into array of objects
    savedScores = JSON.parse(savedScores);

    // HTML content to show the score
    // HTML Header
    var highScoreHeader = document.createElement("h1");
    highScoreHeader.innerText = "High Scores";
    highScoreHeader.className = "align-left margin";
    endGameContainerEl.appendChild(highScoreHeader);

    // loop through array to display scores on screen 
    for (var i = 0; i < savedScores.length; i++) {
        // div space to append highscores 
        var scoreList = document.createElement("div");
        scoreList.innerHTML = savedScores[i].player + " - " + savedScores[i].score; 
        scoreList.className = "highscore";
        endGameContainerEl.appendChild(scoreList);
    }

    // HTML Buttons
    var backBtn = document.createElement("button");
    backBtn.innerText = "Go back";
    backBtn.className = "end-btn";
    endGameContainerEl.appendChild(backBtn);
    backBtn.addEventListener("click", loadContent);

    var clearHighScoresBtn = document.createElement("button");
    clearHighScoresBtn.innerText = "Clear High Scores";
    clearHighScoresBtn.className = "end-btn";
    endGameContainerEl.appendChild(clearHighScoresBtn);
    //clearHighScoresBtn.addEventListener();
};

// function to save array of highscores to local storage
var saveScores = function () {
    console.log("local storage from previous game");
    console.log(localStorage);
    //save old high scores here
    oldHighScores = localStorage.getItem("highscores");
    oldHighScores = JSON.parse(oldHighScores);
    console.log("old high scores");
    console.log(oldHighscores);

    //combine old high scores and current high score
    const newHighScores = oldHighscores.concat(highscores);

    localStorage.setItem("highscores", JSON.stringify(newHighScores));
    console.log("local storage after concat");
    console.log(localStorage);

    loadScores();
};

// function for highscores
var saveScore = function (event) {
    //prevent reset upon submission 
    event.preventDefault();

    var initialSave = document.querySelector("input[name='initials']").value;

    var playerObject = {player: initialSave, score: timeLimit};
    highscores.push(playerObject);

    saveScores();
}

// function to reset game after entering highscore
var endGame = function() {
    headContentEl.textContent = "";

    var scoreHeader = document.createElement("h1");
    scoreHeader.innerText = "All done!";
    scoreHeader.className = "align-left second-margin";
    endGameContainerEl.appendChild(scoreHeader);

    var finalScore = document.createElement("p");
    finalScore.innerHTML = "Your final score is " + timeLimit + ".";
    finalScore.className = "align-left";
    endGameContainerEl.appendChild(finalScore);

    var scoreLabel = document.createElement("label");
    scoreLabel.setAttribute("for", "initials");
    scoreLabel.innerText = "Enter initials: ";
    endGameContainerEl.appendChild(scoreLabel);

    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsInput.id = "initials";
    initialsInput.setAttribute("name", "initials");
    endGameContainerEl.appendChild(initialsInput);

    var submitBtn = document.createElement("button");
    submitBtn.className = "end-btn";
    submitBtn.innerText = "Submit";
    endGameContainerEl.appendChild(submitBtn);

    submitBtn.addEventListener("click", saveScore); 
};

// populate instructions on page load
loadContent();

// to see saved high scores
viewScoresEl.addEventListener("click", loadScores);












