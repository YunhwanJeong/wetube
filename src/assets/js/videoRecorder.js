const recorderContainer = document.getElementById("jsRecorderContainer");
const recordPreview = document.getElementById("jsRecordPreview");
const recordBtn = document.getElementById("jsRecordBtn");

let streamObj;
let videoRecorder;

const handleRecordedData = event => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "test.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObj);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleRecordedData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 300, height: 150 }
    });
    recordPreview.srcObject = stream;
    recordPreview.muted = true;
    recordPreview.play();
    streamObj = stream;
    startRecording();
    recordBtn.innerHTML = "Stop Recording";
  } catch (error) {
    recordBtn.innerHTML = '<i class="fas fa-sad-cry"></i> Can`t Record';
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

const init = () => {
  recordBtn.addEventListener("click", getVideo);
};

if (recorderContainer) {
  init();
}
