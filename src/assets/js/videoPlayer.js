import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreenBtn");
const currentTime = document.getElementById("jsCurrentTime");
const totalTime = document.getElementById("jsTotalTime");
const volumeBar = document.getElementById("jsVolumeBar");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, { method: "POST" });
};

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const handleVolume = () => {
  if (videoPlayer.muted) {
    volumeBar.value = videoPlayer.volume;
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    volumeBar.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const handleFullScreen = () => {
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
};

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

const getCurrentTime = () => {
  const formattedCurrentTime = formatTime(videoPlayer.currentTime);
  currentTime.innerHTML = formattedCurrentTime;
};

const setTotalTime = async () => {
  let duration;
  if (!isFinite(videoPlayer.duration)) {
    const blob = await fetch(videoPlayer.src).then(response => response.blob());
    duration = await getBlobDuration(blob);
  } else {
    duration = videoPlayer.duration;
  }
  const formattedTotalTime = formatTime(duration);
  totalTime.innerHTML = formattedTotalTime;
  setInterval(getCurrentTime, 1000);
};

const handleEnded = () => {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
};

const handleVolumeBar = event => {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;

  if (value >= 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value === "0") {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
};

const init = () => {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolume);
  fullScreenBtn.addEventListener("click", handleFullScreen);
  videoPlayer.addEventListener("canplaythrough", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeBar.addEventListener("input", handleVolumeBar);
};

if (videoContainer) {
  init();
}
