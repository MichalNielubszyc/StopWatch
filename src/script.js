// Stopwatch Buttons & display

const startBtn = document.querySelector('.startBtn');
const stopBtn = document.querySelector('.stopBtn');
const startStopBtn = document.querySelector('.startStopBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const display = document.querySelector('.display');

// Start & Stop functions

let startTime;
let elapsedTime = 0;
let stopWatchInterval;

function start(){
    startTime = Date.now() - elapsedTime;
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

function formatTime(){
    elapsedTime = elapsedTime.toFixed(0);
    elapsedTimeSeconds = Math.floor(elapsedTime/1000) // in s
    elapsedTimeRemainder = Math.floor((elapsedTime % 1000)/10) ; // in 0.01 s
}

function changeStartStopBtn(){
    if (startStopBtn.classList.contains('startBtn')){
        startStopBtn.classList.add('stopBtn');
        startStopBtn.classList.remove('startBtn');
        startStopBtn.innerHTML = 'Stop';
    }else if(startStopBtn.classList.contains('stopBtn')){
        startStopBtn.classList.add('startBtn');
        startStopBtn.classList.remove('stopBtn');
        startStopBtn.innerHTML = 'Start';
    }  
}