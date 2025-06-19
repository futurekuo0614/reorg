export function addSubtitleLine(time, text) {
  const display = document.getElementById("subtitleDisplay");
  const div = document.createElement("div");
  div.textContent = `[${time}] ${text}`;
  display.appendChild(div);
  display.scrollTop = display.scrollHeight;
}

export function resetSubtitles() {
  const display = document.getElementById("subtitleDisplay");
  display.innerHTML = '';
}
