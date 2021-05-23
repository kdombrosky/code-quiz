// global variables
var highscore = 0;
var timeLimit = 75; 
var quizIndex = 0;
var highscores = [];

// initial page content
var timerEl = document.querySelector("#timer");
var headContentEl = document.querySelector("#head-content");
var contentEl = document.querySelector("#content");
var answerContainerEl = document.querySelector("#answer-btns");
var answerValueContainerEl = document.querySelector("#answer-value");

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
// function to clear content! 
var clearContent = function() {
    contentEl.innerHTML = "";
};

// function to reset content for in game
var resetContent = function() {
    // remove button elements if they exist
    while(answerContainerEl.firstChild) {
        answerContainerEl.removeChild(answerContainerEl.firstChild);
    }

    // remove appended correct/wrong value
    while(answerValueContainerEl.firstChild) {
        answerValueContainerEl.removeChild(answerValueContainerEl.firstChild);
    }
};

// function to countdown from timer
var startTimer = function() {
    // timer function decrements every second
    var countdown = setInterval(function() {
        if(timeLimit >= 1) {
            timerEl.textContent = timeLimit;
            timeLimit--;
        } else {
            timerEl.textContent = "0";
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
};

// function to process selected answer and then once again call populateQuestion()
var selectedAnswer = function(event) {
    resetContent();
    // check if answer selected has an attribute
    var confirmCorrectAnswer = event.target.hasAttribute("data-confirm");
    quizIndex++;

    if(confirmCorrectAnswer) {
        // show answer value in answerValueContainerEl
        var answerValue = document.createElement("p");
        answerValue.innerText = "Correct!";
        answerValueContainerEl.appendChild(answerValue);
    } else {
        // show answer value in answerValueContainerEl
        var answerValue = document.createElement("p");
        answerValue.innerText = "Wrong!";
        answerValueContainerEl.appendChild(answerValue);

        //subtract value from timer! 
        timeLimit = timeLimit - 10;
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

    console.log(quizIndex);
};


// function to start game!
var startQuiz = function() {
    clearContent();
    startTimer();
    populateQuestion();
};

// function to load initial files
var loadContent = function() {
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

// function for highscores

// function for localStorage

// function to reset game after entering highscore
var endGame = function() {
    clearContent();
    headContentEl.textContent = "All done!"

};


loadContent();












