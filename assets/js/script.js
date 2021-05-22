// global variables
var highscore = 0;
var timeLimit = 75; 

// initial page content
var headContentEl = document.querySelector("#head-content");
var contentEl = document.querySelector("#content");
var answerContainerEl = document.querySelector("#answer-btns");


// array for question objects
var questions = [
    { q: "Commonly used data types do NOT include:" },
    { q: "" },
    { q: "" },
    { q: "" },
    { q: "" }
]; 

// array for answer objects
var answers = [
    {
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "numbers"
    },
    {
        a: "",
        b: "",
        c: "",
        d: ""
    },
    {
        a: "",
        b: "",
        c: "",
        d: ""
    },
    {
        a: "",
        b: "",
        c: "",
        d: ""
    },
    {
        a: "",
        b: "",
        c: "",
        d: ""
    }
]; 

// array for correct answer object
var correctAnswer = [
    { correct: "b" },
    { correct: "" },
    { correct: "" },
    { correct: "" },
    { correct: "" }
]; 



// OR the whole quiz is one object 

var quiz = [
    {
        question: "", 
        a: "",
        b: "",
        c: "",
        d: "",
        correctAnswer: ""
    }
]


// we will need to dynamically create buttons for each answer. 4 total


// upon page load 
// can call loadContent() to dynamically add HTML to page 
// then upon start button press:
    // call deleteContent() to remove, and inside of deleteContent() call:
    // populateQuestion() 
// populateQuestion() will 
    // create HTML elements <h1> and <button>
    // populate them based on the index i in the for loop for the array length

// when a button is clicked in populateQuestion()
    //


// function to start game!
var startQuiz = function() {
    console.log("Started!!!");
    contentEl.innerHTML = "";
}

// function to load initial files
var loadContent = function() {
    // populate with initial instructions
    headContentEl.innerHTML = "<h1> Coding Quiz Challenge </h1>";
    
    var instructions = document.createElement("p");
    instructions.innerHTML = "Try to answer the following code-related questions within the time limit. <br/> Keep in mind that incorrect answers will penalize your score/time <br/> by ten seconds!";

    var startBtn = document.createElement("button");
    startBtn.textContent = "Start Quiz";
    startBtn.className = "btn";
    startBtn.id = "start";

    contentEl.appendChild(instructions);
    contentEl.appendChild(startBtn);

    startBtn.addEventListener("click", startQuiz);
};

loadContent();












