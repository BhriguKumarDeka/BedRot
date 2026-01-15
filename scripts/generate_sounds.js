const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "../public/sounds");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function createWav() {
  // 0.1s beep at 8kHz 8-bit mono
  const sampleRate = 8000;
  const duration = 0.1;
  const numSamples = Math.floor(sampleRate * duration);
  const byteRate = sampleRate;
  const blockAlign = 1;
  const subChunk2Size = numSamples * blockAlign;
  const chunkSize = 36 + subChunk2Size;

  const buffer = Buffer.alloc(44 + numSamples);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(chunkSize, 4);
  buffer.write("WAVE", 8);

  // fmt subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(8, 34); // 8-bit

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(subChunk2Size, 40);

  // Data (Square wave beep)
  // 400hz
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Square wave
    const v = Math.sin(2 * Math.PI * 400 * t) > 0 ? 200 : 50;
    buffer.writeUInt8(v, 44 + i);
  }

  return buffer;
}

function createClickWav() {
  // Higher pitch shorter click
  const sampleRate = 8000;
  const duration = 0.05;
  const numSamples = Math.floor(sampleRate * duration);
  const byteRate = sampleRate;
  const blockAlign = 1;
  const subChunk2Size = numSamples * blockAlign;
  const chunkSize = 36 + subChunk2Size;

  const buffer = Buffer.alloc(44 + numSamples);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(chunkSize, 4);
  buffer.write("WAVE", 8);

  // fmt subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(8, 34);

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(subChunk2Size, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // 800hz
    const v = Math.sin(2 * Math.PI * 800 * t) > 0 ? 180 : 80;
    // decay volume
    const decay = 1 - i / numSamples;
    buffer.writeUInt8(Math.floor(v * decay), 44 + i);
  }

  return buffer;
}

fs.writeFileSync(path.join(outDir, "page.wav"), createWav());
fs.writeFileSync(path.join(outDir, "click.wav"), createClickWav());
console.log("Sounds created.");
