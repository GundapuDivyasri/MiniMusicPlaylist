
const playBtns = document.querySelectorAll('.play-btn');
const audioPlayer = document.getElementById('audioPlayer');
const currentSongTitle = document.getElementById('currentSongTitle');
const currentSongArtist = document.getElementById('currentSongArtist');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

let songs = Array.from(document.querySelectorAll('.song'));
let currentIndex = -1;

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

function loadSong(index) {
  const song = songs[index];
  if (!song) return;

  audioPlayer.src = song.dataset.src;
  currentSongTitle.textContent = song.dataset.title;
  currentSongArtist.textContent = song.dataset.artist;
  audioPlayer.play();
  playPauseBtn.textContent = '⏸️';
  currentIndex = index;
}

function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';
  }
}

function playNext() {
  let nextIndex = (currentIndex + 1) % songs.length;
  loadSong(nextIndex);
}

function playPrev() {
  let prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(prevIndex);
}

playBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => loadSong(index));
});

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);

audioPlayer.addEventListener('timeupdate', () => {
  progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  durationEl.textContent = formatTime(audioPlayer.duration || 0);
});

progressBar.addEventListener('input', () => {
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

