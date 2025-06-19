import { OPENAI_API_KEY } from './api_key.js';
import { addSubtitleLine, resetSubtitles } from './subtitle_ui.js';
import { saveSRT, saveSRTasTXT } from './srt_exporter.js';

let subtitleIndex = 1;
let subtitleLog = [];

async function translateAudio(audioBuffer) {
  const formData = new FormData();
  formData.append("file", new Blob([audioBuffer], { type: 'audio/webm' }), "audio.webm");
  formData.append("model", "whisper-1");
  formData.append("response_format", "text");

  const response = await fetch("https://api.openai.com/v1/audio/translations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: formData
  });

  const resultText = await response.text();
  const timestamp = new Date().toISOString().substr(11, 8);
  addSubtitleLine(timestamp, resultText);
  subtitleLog.push({ index: subtitleIndex++, time: timestamp, text: resultText });
}

export function getSubtitleLog() {
  return subtitleLog;
}

export function clearSubtitleLog() {
  subtitleLog = [];
  subtitleIndex = 1;
  resetSubtitles();
}

export default translateAudio;
