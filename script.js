let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let isPaused = false;
let sessions = 4;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const sessionsInput = document.getElementById('sessions');

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    isPaused = false;
    startButton.textContent = 'Start';
    pauseButton.disabled = false;
    timer = setInterval(() => {
      if (!isPaused) {
        timeLeft--;
        updateTimer();
        if (timeLeft === 0) {
          clearInterval(timer);
          alert('Session complete! Take a break.');
          sessions--;
          if (sessions > 0) {
            resetTimer();
            startTimer();
          } else {
            alert('All sessions completed!');
            resetTimer();
          }
        }
      }
    }, 1000);
  }
}

function pauseTimer() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  timeLeft = 25 * 60;
  updateTimer();
  startButton.textContent = 'Start';
  pauseButton.disabled = true;
  pauseButton.textContent = 'Pause';
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
sessionsInput.addEventListener('input', () => {
  sessions = parseInt(sessionsInput.value, 10);
});

updateTimer();