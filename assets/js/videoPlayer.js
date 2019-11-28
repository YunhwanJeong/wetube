const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreenBtn");
const currentTime = document.getElementById("jsCurrentTime");
const totalTime = document.getElementById("jsTotalTime");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolume() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handleFullScreen() {
  const isFullScreen = document.fullscreenElement;
  if (document.fullscreenEnabled) {
    if (!isFullScreen) {
      videoPlayer.requestFullscreen();
      fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else if (isFullScreen) {
      document.exitFullscreen();
      fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  }
}

const formatTime = seconds => {
  const secondsNumber = Math.floor(seconds);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  const formattedCurrentTime = formatTime(videoPlayer.currentTime);
  currentTime.innerHTML = formattedCurrentTime;
}

function setTotalTime() {
  const formattedTotalTime = formatTime(videoPlayer.duration);
  totalTime.innerHTML = formattedTotalTime;
  setInterval(getCurrentTime, 1000);
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolume);
  fullScreenBtn.addEventListener("click", handleFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
}

if (videoContainer) {
  init();
}
