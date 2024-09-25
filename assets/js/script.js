let video = document.getElementById('meditationVideo');
let timerDuration = 120; // Default to 2 minutes
let timerInterval;
let timerRunning = false; // Track if the timer is running

function playPauseVideo() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<img class="icon" src="https://img.icons8.com/ios-filled/20/ffffff/pause.png" alt="Pause Icon"/>Pause Music';
        startTimer();
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<img class="icon" src="https://img.icons8.com/ios-filled/20/ffffff/play.png" alt="Play Icon"/>Play Music';
        stopTimer();
    }
}

document.getElementById('playPauseBtn').addEventListener('click', playPauseVideo);

const timerButtons = document.querySelectorAll('.timer-btn');
const timerDisplay = document.getElementById('timerDisplay');

timerButtons.forEach(button => {
    button.addEventListener('click', function () {
        clearInterval(timerInterval);
        timerDuration = parseInt(button.getAttribute('data-time'));
        updateTimerDisplay(timerDuration);
        video.currentTime = 0; // Seek to the beginning
        video.play(); // Play video
        document.getElementById('playPauseBtn').innerHTML = '<img class="icon" src="https://img.icons8.com/ios-filled/20/ffffff/pause.png" alt="Pause Icon"/>Pause Music'; 
        if (!timerRunning) {
            startTimer();
        }
    });
});

function startTimer() {
    if (timerDuration > 0) {
        timerRunning = true;
        timerInterval = setInterval(() => {
            if (timerDuration > 0) {
                timerDuration--; // Reduce time only if it's greater than 0
                updateTimerDisplay(timerDuration);
            }

            if (timerDuration <= 0) {
                clearInterval(timerInterval);
                video.pause(); // Pause video when timer ends
                document.getElementById('playPauseBtn').innerHTML = '<img class="icon" src="https://img.icons8.com/ios-filled/20/ffffff/play.png" alt="Play Icon"/>Play Music';
                timerRunning = false;
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `Timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
