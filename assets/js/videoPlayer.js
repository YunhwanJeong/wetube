const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreenBtn");

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

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolume);
  fullScreenBtn.addEventListener("click", handleFullScreen);
}

if (videoContainer) {
  init();
}
