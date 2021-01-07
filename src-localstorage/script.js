// Reading previous scores form localStorage
                    
let dataFromLocalStorage = (JSON.parse(localStorage.getItem('STOPWATCH_DATA'))) || {} 
const scoresContainer = document.querySelector('.scores-section')                    
let listExists = false;
const currentDataArray = Object.entries(dataFromLocalStorage)

// Rendering last scores from localStorage + accordion

function renderScores(arrays) {
    if (listExists){
        const previousList = document.querySelector('ul');
        previousList.remove();
    }
    const list = document.createElement('ul');
    let html = '';

    arrays.forEach((array) => {
        const title = array[0];
        const scoresFromLS = array[1];
        html += `<li class="flex-container">
        <p class="tab text-xl font-bold font-sans text-indigo-600">${title}:</p>
        <p class="tab-slide hidden text-xl font-bold font-sans text-indigo-600">${scoresFromLS}</p>
        <br>
        </li>`
    });
    
    list.innerHTML = html;
    scoresContainer.appendChild(list);
    listExists = true;
    createAccordion()
}

renderScores(currentDataArray);

function createAccordion() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tab.nextElementSibling.classList.toggle('hidden')
        })
    })
}
      
// Stopwatch Buttons & display

const startBtn = document.querySelector('.startBtn');
const stopBtn = document.querySelector('.stopBtn');
const nextBtn = document.querySelector('.nextBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resetBtn = document.querySelector('.resetBtn');
const saveBtn = document.querySelector('.saveBtn');
const display = document.querySelector('.display');

// State management & hiding/showing buttons

let state = '';

function updateState(x){
    state = x;
    if (state === 'initial'){
        hide([stopBtn, nextBtn, pauseBtn, resetBtn, saveBtn]);
        show([startBtn])   
    }else if (state === 'started'){
        hide([startBtn]);
        show([stopBtn, nextBtn, pauseBtn, resetBtn])    
    } else if (state === 'stopped'){
        hide([startBtn, stopBtn, nextBtn, pauseBtn])
        show([resetBtn, saveBtn])    
    } else if (state === 'paused'){
        hide([stopBtn, nextBtn, saveBtn])
        show([startBtn])
    }
}

function hide(buttons){
    buttons.forEach((btn) => {
        btn.classList.add('hidden')
    })
}
function show(buttons){
    buttons.forEach((btn) => {
        btn.classList.remove('hidden')
    })
}

// Start function

let startTime;
let elapsedTime = 0;
let stopWatchInterval;

function start(){
    if (state = 'paused') {
        pauseBtn.innerHTML = 'Pause'
    }
    startTime = Date.now() - elapsedTime;
    updateState('started')
    stopWatchInterval = setInterval(printTime, 10);
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
    if (state === 'started' || state === 'next'){
        updateState('paused');
        clearInterval(stopWatchInterval)
        pauseBtn.innerHTML = 'Resume'
    } else if ( state === 'paused') {
        start();
        pauseBtn.innerHTML = 'Pause'
    }
}
pauseBtn.addEventListener('click', pause)

// Stop function

function stop(){
    clearInterval(stopWatchInterval);
    printLastTime();
    display.innerHTML = `0:00`;
    updateState('stopped');
    scoreListDisplay();
}
stopBtn.addEventListener('click', stop)

// Reset function

function reset(){
    display.innerHTML = `0:00`
    currentScoresHeader.innerHTML = ''
    elapsedTime = 0;
    clearInterval(stopWatchInterval);
    let scores = document.querySelectorAll('.score');
    scores.forEach((score) => {
        score.remove()
    })
    updateState('initial')
}
resetBtn.addEventListener('click', reset)

// Next function

const currentScoresSection = document.querySelector('.current-scores-section');
const currentScoresHeader = document.querySelector('.current-scores-header');

function nextStart(){
    state = 'next';
    currentScoresHeader.innerHTML = 'Current scores:'
    printLastTime()
}

function printLastTime(){
    elapsedTime = Date.now() - startTime; // in ms
    formatTime();
    let elapsedLastTimeSeconds = elapsedTimeSeconds;
    let elapsedLastTimeRemainder = elapsedTimeRemainder;
    const displayLast = document.createElement('h2');
    displayLast.className = `displayLast score text-xl mt-8 font-bold font-sans text-indigo-600 small-margins`
    if(elapsedLastTimeRemainder<10){
        displayLast.innerHTML = `${elapsedLastTimeSeconds}:0${elapsedLastTimeRemainder}`;
    }else{
        displayLast.innerHTML = `${elapsedLastTimeSeconds}:${elapsedLastTimeRemainder}`;
    }
    currentScoresSection.appendChild(displayLast)
}
nextBtn.addEventListener('click', nextStart)

// Score list

function scoreListDisplay(){
    let scores = document.querySelectorAll('.score')
    let scoreArray = Array.from(scores)
    let scoreList = scoreArray.map((score) => {
        return scoreInnerHTML = score.innerHTML
    })
}

// Saving scores in localStorage

function saveInLocalStorage(){
    let scoreNodeList = document.querySelectorAll('.score')
    let scoreArray = Array.from(scoreNodeList)
    let scoreList = scoreArray.map((score) => {
        return scoreInnerHTML = score.innerHTML
    })
    
    const arrayName = prompt('Type scorelist name')
    if (!arrayName){
        alert('Save failed! You need to type a scorelist name!')
        return
    }

    dataFromLocalStorage = JSON.parse(localStorage.getItem('STOPWATCH_DATA')) 
    console.log(dataFromLocalStorage)
    localStorage.setItem('STOPWATCH_DATA', JSON.stringify({...dataFromLocalStorage, [arrayName]: scoreList}))
    if (listExists){
        list = document.querySelector('ul');
    } else {
        const list = document.createElement('ul');
    }

    const li = document.createElement('li');
    li.classList.add('flex-container');
    li.innerHTML = `
    <p class="current-tab tab text-xl font-bold font-sans text-indigo-600">${arrayName}:</p>
    <p class="tab-slide hidden text-xl font-bold font-sans text-indigo-600">${scoreList}</p>
    <br>
    `
    list.appendChild(li)
    listExists = true;

    const currentTabs = document.querySelectorAll('.current-tab');
    const lastTab = currentTabs[currentTabs.length - 1];
    
    createCurrentAccordion(lastTab);

    reset();
}
saveBtn.addEventListener('click', saveInLocalStorage)

function createCurrentAccordion(item) {

    item.addEventListener('click', () => {
        item.nextElementSibling.classList.toggle('hidden');
    })
}

// Formatters and other

function formatTime(){
    elapsedTime = elapsedTime.toFixed(0);
    elapsedTimeSeconds = Math.floor(elapsedTime/1000) // in s
    elapsedTimeRemainder = Math.floor((elapsedTime % 1000)/10) ; // in 0.01 s
}