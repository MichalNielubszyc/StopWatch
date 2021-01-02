// Stopwatch Buttons & display

const startBtn = document.querySelector('.startBtn');
const stopBtn = document.querySelector('.stopBtn');
const nextBtn = document.querySelector('.nextBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resetBtn = document.querySelector('.resetBtn');
const saveBtn = document.querySelector('.saveBtn');
const display = document.querySelector('.display');

// Start function

let startTime;
let elapsedTime = 0;
let stopWatchInterval;

function start(){
    if (isStopBtnClicked){
        startTime = Date.now();
        isStopBtnClicked = false;
    } else if (!isStopBtnClicked) {
        startTime = Date.now() - elapsedTime;
    }
    stopWatchInterval = setInterval(printTime, 10);
    changeStartStopBtn();
    pauseBtn.classList.remove('clicked');
    saveBtn.classList.add('button--hidden');
}
startBtn.addEventListener('click', start)

function printTime(){
    elapsedTime = Date.now() - startTime; // in ms
    formatTime();
    if(elapsedTimeRemainder<10){
        display.innerHTML = `${elapsedTimeSeconds}:0${elapsedTimeRemainder}`;
    }else{
        display.innerHTML = `${elapsedTimeSeconds}:${elapsedTimeRemainder}`;
    }
}

// Pause function

function pause(){
    if (!pauseBtn.classList.contains('clicked')){
        clearInterval(stopWatchInterval);
        changeStartStopBtn();
        pauseBtn.classList.add('clicked')
    } else {
        start();
    }
    
}
pauseBtn.addEventListener('click', pause)

// Stop function

let isStopBtnClicked = false;

function stop(){
    clearInterval(stopWatchInterval);
    changeStartStopBtn();
    isStopBtnClicked = true;
    saveBtn.classList.remove('button--hidden');
    if (isNextBtnClicked){
        printLastTime();
        display.innerHTML = `0:00`;
    } else if (!isNextBtnClicked){
        display.classList.add('score')
    }
    scoreListDisplay();
}
stopBtn.addEventListener('click', stop)

// Reset function

function reset(){
    display.innerHTML = `0:00`
    elapsedTime = 0;
    clearInterval(stopWatchInterval);
    if (startBtn.classList.contains('button--hidden')){
        changeStartStopBtn();
    }
    let scores = document.querySelectorAll('.score');
    scores.forEach((score) => {
        score.remove()
    })
    }

resetBtn.addEventListener('click', reset)

// Next function

const displayContainer = document.querySelector('.display-container');
let isNextBtnClicked = false;

function nextStart(){
    printLastTime()
    isNextBtnClicked = true;
}

let listPosition = 1;

function printLastTime(){
    elapsedTime = Date.now() - startTime; // in ms
    formatTime();
    let elapsedLastTimeSeconds = elapsedTimeSeconds;
    let elapsedLastTimeRemainder = elapsedTimeRemainder;
    const displayLast = document.createElement('h2');
    displayLast.className = `displayLast${listPosition} score text-xl mt-8 font-bold font-sans text-indigo-600 small-margins`
    if(elapsedLastTimeRemainder<10){
        displayLast.innerHTML = `${elapsedLastTimeSeconds}:0${elapsedLastTimeRemainder}`;
    }else{
        displayLast.innerHTML = `${elapsedLastTimeSeconds}:${elapsedLastTimeRemainder}`;
    }
    displayContainer.appendChild(displayLast)
    listPosition = listPosition +1;
}

nextBtn.addEventListener('click', nextStart)

// Score list

function scoreListDisplay(){
    let scores = document.querySelectorAll('.score')
    let scoreArray = Array.from(scores)
    let scoreList = scoreArray.map((score) => {
        return scoreInnerHTML = score.innerHTML
    })
    console.table(scoreList)    
}

// Formatters and other

function formatTime(){
    elapsedTime = elapsedTime.toFixed(0);
    elapsedTimeSeconds = Math.floor(elapsedTime/1000) // in s
    elapsedTimeRemainder = Math.floor((elapsedTime % 1000)/10) ; // in 0.01 s
}

function changeStartStopBtn(){
    if (startBtn.classList.contains('button--hidden')){
        startBtn.classList.remove('button--hidden')
        stopBtn.classList.add('button--hidden')
    } else {
        startBtn.classList.add('button--hidden')
        stopBtn.classList.remove('button--hidden')
    }
}
