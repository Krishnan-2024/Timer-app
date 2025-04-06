// Timer durations in seconds for each mode
const durations = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
  };
  
  // Global variables to track timer state
  let currentMode = 'pomodoro';
  let timeLeft = durations[currentMode];
  let timerInterval = null;
  
  // Select DOM elements
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const alarmSound = document.getElementById('alarm');
  
  // Update the displayed time
  function updateDisplay() {
    const hrs = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
    const mins = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const secs = String(timeLeft % 60).padStart(2, '0');
  
    hoursEl.textContent = hrs;
    minutesEl.textContent = mins;
    secondsEl.textContent = secs;
  }
  
  // Start the timer countdown //time based using schedular
  function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals
  
    timerInterval = setInterval(() => { 
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        alarmSound.play();
      }
    }, 1000);
  }
  
  // Pause the timer countdown
  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  // Reset the timer to the initial duration of the current mode
  function resetTimer() {
    pauseTimer();
    timeLeft = durations[currentMode];
    updateDisplay();
  }
  
  // Stop the timer and reset to zero
  function stopTimer() {
    pauseTimer();
    timeLeft = 0;
    updateDisplay();
  }
  
  // Switch timer mode and reset timer accordingly
  function switchMode(mode) {
    pauseTimer();
    currentMode = mode;
    timeLeft = durations[mode];
    updateDisplay();
  }
  
  // Attach event listeners for mode buttons
  document.getElementById('pomodoro').addEventListener('click', () => switchMode('pomodoro'));
  document.getElementById('short-break').addEventListener('click', () => switchMode('short'));
  document.getElementById('long-break').addEventListener('click', () => switchMode('long'));
  
  // Attach event listeners for control buttons
  document.getElementById('start').addEventListener('click', startTimer);
  document.getElementById('pause').addEventListener('click', pauseTimer);
  document.getElementById('reset').addEventListener('click', resetTimer);
  document.getElementById('stop').addEventListener('click', stopTimer);
  
  // Initialize display on page load
  updateDisplay();
  