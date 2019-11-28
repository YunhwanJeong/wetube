const recorderContainer = document.getElementById("jsRecorderContainer");
const recordPreview = document.getElementById("jsRecordPreview");
const recordBtn = document.getElementById("jsRecordBtn");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 300, height: 150 }
    });
    recordPreview.srcObject = stream;
    recordPreview.muted = true;
    recordPreview.play();
  } catch (error) {
    recordBtn.innerHTML = '<i class="fas fa-sad-cry"></i> Can`t Record';
    recordBtn.removeEventListener("click", startRecording);
  }
};

const init = () => {
  recordBtn.addEventListener("click", startRecording);
};

if (recorderContainer) {
  init();
}
