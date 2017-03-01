
// *******************************************************************
// State
// *******************************************************************
let isRunning = false;
let animationRequestId;
let startTime = 0;
let passedTime = 0;


// *******************************************************************
// Control
// *******************************************************************
function startTimer() {
  if (isRunning) { return; }
  isRunning = true;
  startTime = Date.now() - passedTime;
  runTimer();
}


function runTimer() {
  passedTime = Date.now() - startTime;
  showTimer(passedTime);
  animationRequestId = window.requestAnimationFrame(runTimer);
}


function stopTimer() {
  if (!isRunning) { return; }
  isRunning = false;

  window.cancelAnimationFrame(animationRequestId);
  animationRequestId = undefined;
}


function resetTimer() {
  stopTimer();
  passedTime = 0;
  startTime = 0;
  showTimer(startTime);
}

//
// function getCurrentMs() {
//   return Date.now();
// }



// *******************************************************************
// View
// *******************************************************************
const displayDOM = document.querySelector('.display__time');

function addEventListeners() {
  const startDOM = document.querySelector('.controls__btn--start');
  const pauseDOM = document.querySelector('.controls__btn--pause');
  const resetDOM = document.querySelector('.controls__btn--reset');

  startDOM.addEventListener('click', startTimer);
  pauseDOM.addEventListener('click', stopTimer);
  resetDOM.addEventListener('click', resetTimer);
}


function showTimer(miliSec) {
  displayDOM.textContent = formatDisplay(miliSec);
}


function formatDisplay(miliSec) {
  const centiSec = Math.floor((miliSec / 10) % 100);
  const sec      = Math.floor((miliSec / 1000) % 60);
  const min      = Math.floor((miliSec / (1000 * 60)) % 60);
  const hour     = Math.floor((miliSec / (1000 * 60 * 60)) % 100);
  return `${padWithZero(hour)}:${padWithZero(min)}:${padWithZero(sec)}.${padWithZero(centiSec)}`;
}


function padWithZero(n) {
  return n < 10 ? `0${n}` : n;
}

addEventListeners();


// module.exports = {
//   sum,
//   multiply,
//   addOneAsyncWithCallback
// };
