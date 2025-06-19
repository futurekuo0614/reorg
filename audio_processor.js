import translateAudio from './main.js';

export async function getAudioStreamAndProcess() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  let chunks = [];

  mediaRecorder.ondataavailable = async event => {
    chunks.push(event.data);
  };

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    const buffer = await audioBlob.arrayBuffer();
    await translateAudio(buffer);
    chunks = [];
    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 2000);
  };

  mediaRecorder.start();
  setTimeout(() => mediaRecorder.stop(), 2000);
}
