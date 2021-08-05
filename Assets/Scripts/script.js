var quizStartBtn = document.querySelector("#quizBeginButton");
var quizStart = document.querySelector("#quizStart");
var quiz = document.querySelector("#quiz");
var questionName = document.querySelector("#nameOfQuestion");
var quizButtons = document.querySelector("#buttons");
var validateAnswer = document.querySelector('#validateAnswer');
var scoreTitle = document.querySelector("#scoreTitle")
let question =1;;
var timer = document.querySelector('#timer');
var time = 90;
var score = document.querySelector("#scoreIs");
var timerInterval;
var scoreForm = document.querySelector("#scoreForm");
function switchToQuiz() {
    console.log("quizes")
    quizStart.innerHTML = ''
    startTimer();
    generateQuestion();
}

function startTimer(){
    timerInterval = window.setInterval(updateTimer,1000);
}

function updateTimer(){
    timer.innerHTML = ('time left: '+ time);
    time--;
    if(time <= 0){
        window.clearInterval(timerInterval);
        switchToQuizForm();
    }
}

function generateQuestion(){
    if(question === 6){
        switchToQuizForm();
        return;
    }
    questionName.innerHTML = getQuestionName();
    quizButtons.replaceChildren(...getButtonsForQuestion());
    question = question + 1;
}

function getQuestionName(){
    switch(question){
        case(1):
            return "what is an Array?"
        case(2):
            return "What is a boolean?"
        case(3):
            return "what is a int?"
        case(4):
            return "what is a string?"
        case(5):
            return "what does null mean?"
        default:
            return "you aren't supposed to be here!"
    }
}

function getButtonsForQuestion(){
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    let btn3 = document.createElement("button");
    let btn4 = document.createElement("button");

    switch(question){
        case(1):
            btn1.innerHTML = "A reference of references"
            btn2.innerHTML = "A number"
            btn3.innerHTML = "A true false type"
            btn4.innerHTML = "A array of chars"
            btn1.addEventListener('click', rightAnswer)
            btn2.addEventListener('click', wrongAnswer)
            btn3.addEventListener('click', wrongAnswer)
            btn4.addEventListener('click', wrongAnswer)
            break;
        case(2):
            btn1.innerHTML = "A reference of references"
            btn2.innerHTML = "A array of chars"
            btn3.innerHTML = "A true false type"
            btn4.innerHTML = "A number"
            btn1.addEventListener('click', wrongAnswer)
            btn2.addEventListener('click', wrongAnswer)
            btn3.addEventListener('click', rightAnswer)
            btn4.addEventListener('click', wrongAnswer)
            break;
        case(3):
            btn1.innerHTML = "A array of chars"
            btn2.innerHTML =  "A reference of references"
            btn3.innerHTML = "A true false type"
            btn4.innerHTML = "A number"
            btn1.addEventListener('click', wrongAnswer)
            btn2.addEventListener('click', wrongAnswer)
            btn3.addEventListener('click', wrongAnswer)
            btn4.addEventListener('click', rightAnswer)
            break;
        case(4):
            btn1.innerHTML =  "A true false type"
            btn2.innerHTML =  "A reference of references"
            btn3.innerHTML ="A array of chars"
            btn4.innerHTML = "A number"
            btn1.addEventListener('click', wrongAnswer)
            btn2.addEventListener('click', wrongAnswer)
            btn3.addEventListener('click', rightAnswer)
            btn4.addEventListener('click', wrongAnswer)
            break;
        case(5):
            btn1.innerHTML =  "A true false type"
            btn2.innerHTML =  "A reference of references"
            btn3.innerHTML = "A array of chars"
            btn4.innerHTML = "null represents that nothing exists, as opposed to something existing that is empty"
            btn1.addEventListener('click', wrongAnswer)
            btn2.addEventListener('click', wrongAnswer)
            btn3.addEventListener('click', wrongAnswer)
            btn4.addEventListener('click', rightAnswer)

            break;
        default:
            break;
    }
    return [btn1, btn2,btn3,btn4];
}

function rightAnswer(){
    validateAnswer.innerHTML ="Correct!"
    generateQuestion()
}

function wrongAnswer(){
    validateAnswer.innerHTML ="Incorrect!"
    generateQuestion()
    time = time -25;
}

function switchToQuizForm(){
    quiz.innerHTML =''
    scoreTitle.innerHTML ="Save your score!"
    score.innerHTML = ("your score is : " +time + " seconds"); 
    window.clearInterval(timerInterval);
    let input = document.createElement("input");
    let submitButton = document.createElement("button");
    let label = document.createElement("label");
    label.innerHTML = "input your initials"
    submitButton.innerHTML = "submit score"
    scoreForm.replaceChildren(...[label,input, submitButton]);
    scoreForm.addEventListener("submit", (event) =>addToScores(event, input));

}
function addToScores(event, input){
    event.preventDefault();
    if(input.value.length !== 0){
        console.log("HELP")
        console.log(input.value);
        score = {initials: input.value,score: time}
        let scores = localStorage.getItem("scores");
        let scoresList = JSON.parse(scores);
        if(scoresList === null){
            scoresList = [];
        }
        scoresList.push(score);
        localStorage.setItem("scores", JSON.stringify(scoresList));
        location.reload();
    }
    else{
        window.alert("Please enter your intials!")
    }
}

quizStartBtn.addEventListener("click", switchToQuiz);
