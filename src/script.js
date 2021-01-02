// Stopwatch Buttons & display

const startBtn = document.querySelector('.startBtn');
const stopBtn = document.querySelector('.stopBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resetBtn = document.querySelector('.resetBtn');
const display = document.querySelector('.display');

// Start function

let startTime;
let elapsedTime = 0;
let stopWatchInterval;

function start(){
    if (isStopBtnClicked){
        startTime = Date.now();
        isStopBtnClicked = false;
    } else {
        startTime = Date.now() - elapsedTime;
    }
    stopWatchInterval = setInterval(printTime, 10);
    changeStartStopBtn();
    pauseBtn.classList.remove('clicked')
}
startBtn.addEventListener('click', start)

function printTime(){
    elapsedTime = Date.now() - startTime; // in ms
    formatTime();
    if(elapsedTimeRemainder<10){
        display.innerHTML = `${elapsedTimeSeconds}:0${elapsedTimeRemainder}`
    }else{
        display.innerHTML = `${elapsedTimeSeconds}:${elapsedTimeRemainder}`
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
}

resetBtn.addEventListener('click', reset)

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