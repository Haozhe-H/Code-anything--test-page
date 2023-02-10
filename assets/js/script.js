var questions = [
    {
        title: `If you type the following code in the console window, what result will you get? \n 3 > 2 > 1 === false`,
        opts: ['true', 'false', 'none of above', 'both'],
        answer: 'true'
    },

    {
        title: `JavaScript is a ___ -side programming language.`,
        opts: ['client', 'server', 'both', 'none'],
        answer: 'both'
    },

    {
        title: `Which of the following will write the message “Hello World!” in an alert box?`,
        opts: ['alertBox(“Hello World!”)', 'alert(Hello World!)', 'msgAlert(“Hello World!”)', 'alert(“Hello World!”)'],
        answer: 'alert(“Hello World!”)'
    },

    {
        title: `How do you find the minimum of x and y using JavaScript?`,
        opts: ['min(x,y)', 'Math.min(x,y)', 'Math.min(xy)', 'min(xy)'],
        answer: 'Math.min(x,y)'
    },

    {
        title: `Which of the following statement will throw an error?`,
        opts: ['var fun = function bar( ){ }', 'var fun = ( ) => { }', ' function fun( ){ }', 'function( ){ }'],
        answer: 'function( ){ }'
    },

    {
        title: `If the value of x is 40, then what is the output of the following program? \n (x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”);`,
        opts: ['ReferenceError', 'Divisible by 10', 'Not divisible by 10', 'None of the above'],
        answer: 'Divisible by 10'
    },

    {
        title: `Which are the correct “if” statements to execute certain code if “x” is equal to 2?`,
        opts: ['if(x 2)', 'if(x = 2)', 'if(x == 2)', 'if(x != 2 )'],
        answer: 'if(x == 2)'
    },

    {
        title: `What will the code return? \n Boolean(3 < 7)`,
        opts: ['true', 'false', 'none of above', 'SyntaxError'],
        answer: 'true'
    },

    {
        title: `Which is the correct JavaScript syntax to change the HTML content given below? \n <p id=”test”>Hello World!</p>`,
        opts: ['document.getElementById(“test”).innerHTML = “Hello Hello!”', 'document.getElementsById(“test”).innerHTML = “Hello Hello!”', 'document.getElementById(test).innerHTML = “Hello Hello!”', 'document.getElementByTagName(“p”)[0].innerHTML = “Hello Hello!”'],
        answer: 'document.getElementById(“test”).innerHTML = “Hello Hello!”'
    },

    {
        title: `What is the correct JavaScript syntax to print “Hello World” in the console?`,
        opts: ['print(“Hello World”)', 'console.print(“Hello World”)', 'log.console(“Hello World”)', 'console.log(“Hello World”)'],
        answer: 'console.log(“Hello World”)'
    }
]
//info start
const infoEl = document.querySelector('#info')
const startBtnEl = document.querySelector('#start')
//quiz cont
const quizEl = document.querySelector('#quiz')
const questionEl = document.querySelector('#question')
const answerEl = document.querySelector('#answer')
//user score
const userScoreEl = document.querySelector('#userScore')
const initialEl = document.querySelector('#initial')
const submitInitialEl = document.querySelector('#submitInitial')
const scoreEl = document.querySelector('#score')
//user high score
const highScoreEl = document.querySelector('#highScore')
const scoresEl = document.querySelector('#scores')
const backBtnEl = document.querySelector('#back')
const viewHighScoreEl = document.querySelector('#viewHighScore')

const timerEl = document.querySelector('#timer')

var score = 0
var index = 0
var highScore = [] //user score array
var interval
var timeTotal = 60
var secondTake = 0


function startTimer(){
    timerEl.textContent = timeTotal;
    interval = setInterval(() => {
        secondTake ++
        timerEl.textContent = timeTotal - secondTake;
        if(secondTake >= timeTotal){
            index = questions.length
            nextQuestion()
        }
    }, 1000)
}

function stopTimer(){
    clearInterval(interval)
}

function nextQuestion(){
    index ++
    if(index < questions.length){
        renderQuestion()
    }else{
        stopTimer()
        
        scoreEl.textContent = score
        hide(quizEl)
        show(userScoreEl)
        timerEl.textContent = 0
    }
}

function hide(content) {content.style.display = 'none'}
function show(content) {content.style.display = 'block'}

function checkAns(answer) {
    if(questions[index].answer == questions[index].opts[answer.id]){
        score += 5
        showMessage('Correct!')
    }else{
        secondTake += 6
        showMessage('Wrong answer')
    }
}

function showMessage(text) {
    let messageH3 = document.createElement('h3')
    let messageDiv = document.createElement('div')
    messageDiv.textContent = text
    document.querySelector('.jumbotron').appendChild(messageH3)
    document.querySelector('.jumbotron').appendChild(messageDiv)
    setTimeout(() => {
        messageH3.remove()
        messageDiv.remove()
    }, 1500)
}

function renderQuestion() {
    questionEl.textContent = questions[index].title;
    for (i = 0; i < answerEl.children.length; i++) {
        answerEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[index].opts[i]}`
    }
}
// console.log(questions[index]);

function renderHighScore() {

    scoresEl.innerHTML = ""
    show(highScoreEl);
    highScore = JSON.parse(localStorage.getItem("scores"))
    for (let i = 0; i < highScore.length; i++) {
        let scoreItem = document.createElement("div")
        scoreItem.className += "row mb-3 p-3"
        scoreItem.setAttribute("style", "background-color:cornflowerblue;")
        scoreItem.textContent = `${(i + 1)}. ${highScore[i].username} - ${highScore[i].userScore}`
        scoresEl.appendChild(scoreItem)
    }
}

viewHighScoreEl.addEventListener("click", () => {
    hide(infoEl)
    hide(quizEl)
    hide(userScoreEl)
    renderHighScore()
    stopTimer()
    reset()
})

const reset = () => {
    score = 0
    index = 0
    secondTake = 0
    timerEl.textContent = 0
}

startBtnEl.addEventListener("click", () => {
    hide(infoEl)
    startTimer()
    renderQuestion()
    show(quizEl)
});

answerEl.addEventListener("click", (answer) => {
    if (answer.target.matches("button")) {
        checkAns(answer.target)
        nextQuestion()
    }
})

submitInitialEl.addEventListener("click", () => {
    let initValue = initialEl.value.trim()
    if (initValue) {
        let userScore = { 
            username: initValue, 
            userScore: score 
        }
        initialEl.value = ''
        highScore = JSON.parse(localStorage.getItem("scores")) || []
        highScore.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScore))
        hide(userScoreEl)
        renderHighScore()
        reset()
    }
})

backBtnEl.addEventListener("click", () => {
    hide(highScoreEl)
    show(infoEl)
})