// Initialize Firebase and reading previous scores form Firestore

// firebase.initializeApp(firebaseConfig);

const scoresContainer = document.querySelector('.scores-section')

// firebase.firestore().collection('scoresCollection').onSnapshot((scoresDocuments) => renderScores(scoresDocuments));

// Reading previous scores form localStorage

const currentData = (JSON.parse(localStorage.getItem('MY_DATA'))) || {} 

console.log(currentData)
console.log(Object.keys(currentData)[0]) // Scorelist name
console.log(Object.values(currentData)[0]) // Scores

console.log(Array.from(currentData))

// Rendering last scores from Firestore + accordion

// let listExists = false

// function renderScores(documents) {
//     if (listExists){
//         const previousList = document.querySelector('ul')
//         previousList.remove()
//     }
//     const list = document.createElement('ul');
//     let html = '';

// 	documents.forEach((document) => {
// 		const id = document.id;
//         const data = document.data();
//         html += `<li class="flex-container">
//         <p class="tab text-xl font-bold font-sans text-indigo-600">${data.name}:</p>
//         <p class="tab-slide hidden text-xl font-bold font-sans text-indigo-600">${data.scores}</p>
//         <br>
//         </li>`
//     });
    
//     list.innerHTML = html;
//     scoresContainer.appendChild(list)
//     listExists = true;

//     const tabs = document.querySelectorAll('.tab');
//     tabs.forEach((tab) => {
//         tab.addEventListener('click', () => {
//             tab.nextElementSibling.classList.toggle('hidden')
//         })
//     })
// }

// Rendering last scores from localStorage + accordion

// console.log(Object.keys(currentData)[0])
// console.log(Object.values(currentData)[0])

// let listExists = false

// function renderScores(documents) {
//     if (listExists){
//         const previousList = document.querySelector('ul')
//         previousList.remove()
//     }
//     const list = document.createElement('ul');
//     let html = '';

// 	documents.forEach((document) => {
// 		const id = document.id;
//         const data = document.data();
//         html += `<li class="flex-container">
//         <p class="tab text-xl font-bold font-sans text-indigo-600">${data.name}:</p>
//         <p class="tab-slide hidden text-xl font-bold font-sans text-indigo-600">${data.scores}</p>
//         <br>
//         </li>`
//     });
    
//     list.innerHTML = html;
//     scoresContainer.appendChild(list)
//     listExists = true;

//     const tabs = document.querySelectorAll('.tab');
//     tabs.forEach((tab) => {
//         tab.addEventListener('click', () => {
//             tab.nextElementSibling.classList.toggle('hidden')
//         })
//     })
// }

// renderScores(currentData);

// Rendering previous scores from local storage

// function renderScores(){
    //     const lastScoresTitle = document.createElement('h2')
    //     lastScoresTitle.className = 'text-xl font-bold font-sans text-indigo-600'
    //     lastScoresTitle.innerHTML = scoreListNameFromLS;
    //     scoresContainer.appendChild(lastScoresTitle)
    
    //     scoreListFromLS.forEach((score, index) => {
        //         const lastScoresRecord = document.createElement('h2')
        //         lastScoresRecord.className = 'text-xl font-bold font-sans text-indigo-600'
        //         lastScoresRecord.innerHTML = scoreListFromLS[index];
        //         scoresContainer.appendChild(lastScoresRecord)
        // })
        // }
        
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
        console.log(state)
        pauseBtn.innerHTML = 'Resume'
    } else if ( state === 'paused') {
        start();
        pauseBtn.innerHTML = 'Pause'
        console.log(state)
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

// Save in Firestore/localStorage

function save(){
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
    // const testArray = {
    //     name : arrayName,
    //     scores : scoreList
    // }
    // firebase.firestore().collection('scoresCollection').add(testArray)

    localStorage.setItem('MY_DATA', JSON.stringify({...currentData, [arrayName]: scoreList}))
    reset()
}
saveBtn.addEventListener('click', save)

//XXXXXXXXXXXXXXXXXXXXXXX Save in Local Storage

// function save(){
//     let scores = document.querySelectorAll('.score')
//     let scoreArray = Array.from(scores)
//     let scoreList = scoreArray.map((score) => {
//         return scoreInnerHTML = score.innerHTML
//     })
//     const arrayName = prompt('Type scorelist name');
//     localStorage.setItem('scoreListFromLS', scoreList);
//     localStorage.setItem('scoreListNameFromLS', arrayName);
//     // renderScores();
//     const scoresTitle = document.createElement('h2')
//     scoresTitle.className = 'text-xl font-bold font-sans text-indigo-600'
//     scoresTitle.innerHTML = arrayName;
//     scoresContainer.appendChild(scoresTitle)

//     scoreList.forEach((score, index) => {
//         const scoresRecord = document.createElement('h2')
//         scoresRecord.className = 'text-xl font-bold font-sans text-indigo-600'
//         scoresRecord.innerHTML = scoreList[index];
//         scoresContainer.appendChild(scoresRecord)
//     })  
// }
// saveBtn.addEventListener('click', save)

// Formatters and other

function formatTime(){
    elapsedTime = elapsedTime.toFixed(0);
    elapsedTimeSeconds = Math.floor(elapsedTime/1000) // in s
    elapsedTimeRemainder = Math.floor((elapsedTime % 1000)/10) ; // in 0.01 s
}