import { getSubtitleLog } from './main.js';

export function saveSRT() {
  const lines = getSubtitleLog().map((entry, idx) => {
    const startTime = entry.time + ",000";
    const endTime = entry.time + ",999";
    return `${idx + 1}\n${startTime} --> ${endTime}\n${entry.text}\n`;
  });

  const srtContent = lines.join("\n");
  const blob = new Blob([srtContent], { type: 'text/plain' });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "subtitles.srt";
  a.click();
}

export function saveSRTasTXT() {
  const lines = getSubtitleLog().map((entry) => {
    return `[${entry.time}] ${entry.text}`;
  });

  const txtContent = lines.join("\n");
  const blob = new Blob([txtContent], { type: 'text/plain' });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "subtitles.txt";
  a.click();
}
