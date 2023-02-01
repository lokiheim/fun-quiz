//questions array
const questions = [
    {
        question: "What  was the name of 'WarGames AI?",
        options: ["ARIIA", "WOPR", "V'Ger", "H.A.L. 9000"],
        answer: "WOPR"
    },
    {
        question: "Which is not isaac asimov rule of robotics?",
        options: ["a robot may not injure", "A robot must obey orders", "A robot may protect its own existence", "A robot may not bow down to inferior intelligence"],
        answer: "A robot may not bow down to inferior intelligence"
    },
    {
        question: "What did ENCOM evolve into?",
        options: ["Skynet", "V.I.K.I.", "Master Control Program", "Robata"],
        answer: "Master Control Program"
    },
    {
        question: "In South Park's episode 'You Have 0 Friends' what where they making fun off??",
        options: ["Tron", "Facebook ", "Summer Wars", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Who said 'Whoa, what an awful dream. Ones and zeros everywhere. And I thought I saw a two'?",
        options: ["Hedonismbot", "Bender Bending Rodríguez", "Macaulay Culckon", "Flexo"],
        answer: "Bender Bending Rodríguez"
    },
    {
        question: "Who invented the 'kill all humans!' trope?",
        options: ["Karel Capek", "Michael Rennie", "isaac asimov", "Philip K. Dick"],
        answer: "Karel Capek"
    },
    {
        question: "What is 'Do Androids Dream of Electric Sheep', better known?",
        options: ["Westworld", "Claws", "The Illustrated Man", "Blade Runner"],
        answer: "Blade Runner"
    },
    {
        question: "I'm sorry, Dave. I'm afraid I can't do that, is due too?",
        options: ["An error in line 9045", "Self interest", "Runtime error", "Siri got your name wrong"],
        answer: "Self interest"
    }
];
//varables
let timerEl = document.querySelector("#time");
const startBtn = document.querySelector("#start");
const questionsEl = document.getElementById("questions");
let timer;
let timerCount;
let questionIndex = 0;  //here
let endPage = document.getElementById("end-screen");
let endScore = document.getElementById("final-score");
let questionContainer = document.querySelector("#question-title");
let choicesEl = document.getElementById("choices");
let correctAnswer = "";
let messageEl = document.getElementById("message");
let message = document.createElement("p");
let userScore = 0
let initialsEl = document.getElementById("initials");
const submitBtn = document.getElementById("submit");


//atarts the game with 75 secounds
function startGame(){
    timerCount = 75;
    document.getElementById("start-screen").style.display = "none";
    questionsEl.removeAttribute("class");
    startTimer();
    quiz(questionIndex);
}

//timer starts
function startTimer (){
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount <= 0) {
          timerEl.textContent = 0
            endGame();
        }
    }, 1000);
}

//Avengers EndGame
function endGame() {
    clearInterval(timer);
    timerEl.textContent = timerCount;
    questionsEl.style.display = "none";
    endPage.removeAttribute("class");
    endScore.textContent = userScore;
}

//Event listener for start btn
startBtn.addEventListener("click", startGame);

//shows quiz questions
function quiz(questionIndex) {
    let currentQuestion = questions[questionIndex];
    correctAnswer = questions[questionIndex].answer;
    questionContainer.textContent = currentQuestion.question;

    for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = currentQuestion.options[i];
        var optionbtn = document.createElement("button");
        optionbtn.setAttribute("class", "option");
        optionbtn.setAttribute("value", option);
        optionbtn.textContent = i + 1 + '. ' + option;
        optionbtn.onclick = checkAnswer;
        choicesEl.appendChild(optionbtn);
    }
}

//checks answer
function checkAnswer(event){
    questionIndex++;    //mira si pasa
    var userAnswer = event.target.value;
    console.log(userAnswer);
    if (userAnswer === correctAnswer) {
        message.textContent = "Correct!";
        messageEl.appendChild(message);
        userScore++;
    } else {
        message.textContent = "Incorrect! 10 seconds deducted.";
        messageEl.appendChild(message);
        amendTime(-10);
    }
    if (questionIndex >= questions.length) {
        endGame();
    } else {
        choicesEl.innerHTML = "";
        quiz(questionIndex);
    };
}

function amendTime(amount) {
    timerCount += amount;
}

//Highscore
function highScore() {
    let Initials = JSON.parse(localStorage.getItem("Initials")) || [];
    var userData = {
        Initials: initialsEl.value.trim(),
        Score: userScore
    };
    Initials.push(userData);
    localStorage.setItem("Initials", JSON.stringify(Initials));
    window.location.href = "./highscores.html";
}

//submit button
submitBtn.addEventListener("click", function () {
    highScore();
    })
