let player;
let timerDuration = 120; // Default to 2 minutes
let timerInterval;
let timerRunning = false; // Track if the timer is running

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('meditationVideo', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    const playPauseBtn = document.getElementById('playPauseBtn');
    updateTimerDisplay(timerDuration); // Display default timer

    playPauseBtn.addEventListener('click', function () {
        const playerState = player.getPlayerState();
        if (playerState === YT.PlayerState.PAUSED || playerState === YT.PlayerState.CUED) {
            player.playVideo();
            playPauseBtn.innerHTML = '<img class="icon" src="https://img.icons8.com/ios-filled/20/ffffff/pause.png" alt="Pause Icon"/>Pause Music'; // Change to pause icon
            startTimer(); // Start the timer if it's not already running
        } else {
            player.pauseVideo();
            playPauseBtn.innerHTML = '<img class="icon" src="https://img.icons8.com/ios-filled/20/ffffff/play.png" alt="Play Icon"/>Play Music'; // Change to play icon
            stopTimer(); // Stop the timer if video is paused
        }
    });
}

const timerButtons = document.querySelectorAll('.timer-btn');
const timerDisplay = document.getElementById('timerDisplay');

timerButtons.forEach(button => {
    button.addEventListener('click', function () {
        clearInterval(timerInterval);
        timerDuration = parseInt(button.getAttribute('data-time'));
        updateTimerDisplay(timerDuration);
        player.seekTo(0); // Seek to the beginning
        player.playVideo(); // Play video
        document.getElementById('playPauseBtn').innerHTML = '<img class="icon" src="https://img.icons8.com/ios-filled/20/ffffff/pause.png" alt="Pause Icon"/>Pause Music'; // Change to pause icon
        
        if (!timerRunning) { // Only start timer if it's not already running
            startTimer(); // Start timer immediately after selecting
        }
    });
});

function startTimer() {
    if (timerDuration > 0) { // Only start if duration is greater than zero
        timerRunning = true; // Set timer running status
        timerInterval = setInterval(() => {
            timerDuration--;
            updateTimerDisplay(timerDuration);
            
            if (timerDuration <= 0) {
                clearInterval(timerInterval);
                player.pauseVideo(); // Pause video when timer ends
                document.getElementById('playPauseBtn').innerHTML = '<img class="icon" src="https://img.icons8.com/ios-filled/20/ffffff/play.png" alt="Play Icon"/>Play Music'; // Change to play icon
                timerRunning = false; // Reset timer running status
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false; // Reset timer running status
}

function updateTimerDisplay(time) {
    if (time < 0) time = 0; // Prevent negative time display
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `Timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
