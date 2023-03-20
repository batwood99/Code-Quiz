var quizQuestions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does JS stand for?",
    choices: ["Java Sequence", "Java System", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What is the correct way to write an array in JavaScript?",
    choices: ["var colors = 1 = ('yellow'), 2 = ('purple'), 3 = ('blue')", "var colors = 'yellow', 'purple', 'blue'", "var colors = ['yellow', 'purple', 'blue']"],
    answer: "var colors = ['yellow', 'purple', 'blue']"
  },
  {
    question: "What is the correct way to write a function in JavaScript?",
    choices: ["function = myFunction()", "function myFunction()", "myFunction = function()"],
    answer: "function myFunction()"
  }
];

var startButton = document.querySelector("#start-button");
var quizSection = document.querySelector("#quiz");
var questionElement = document.querySelector("#question");
var choicesElement = document.querySelector("#choices");
var endSection = document.querySelector("#end");
var scoreElement = document.querySelector("#score");
var submitButton = document.querySelector("#submit-score");
var initialsInput = document.querySelector("#initials");

var quizTime = 75;
var timer;
var timeLeft;

function startQuiz() {
  timeLeft = quizTime;
  timer = setInterval(function() {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);

  setNextQuestion();
}

function setNextQuestion() {
  if (quizQuestions.length === 0) {
    endQuiz();
    return;
  }

  var randomIndex = Math.floor(Math.random() * quizQuestions.length);
  var currentQuestion = quizQuestions[randomIndex];
  quizQuestions.splice(randomIndex, 1);

  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach(function(choice) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choicesElement.appendChild(choiceButton);
    choiceButton.addEventListener("click", function() {
      if (choice === currentQuestion.answer) {
        setScore(timeLeft);
      } else {
        timeLeft -= 10;
      }
      setNextQuestion();
    });
  });

  quizSection.classList.remove("hide");
  startButton.classList.add("hide");
}

function endQuiz() {
  clearInterval(timer);
  quizSection.classList.add("hide");
  endSection.classList.remove("hide");
  scoreElement.textContent = timeLeft;
}

function setScore(finalScore) {
  localStorage.setItem("score", finalScore);
}

startButton.addEventListener("click", startQuiz);
