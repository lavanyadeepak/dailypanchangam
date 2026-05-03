const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
const upload = multer({ dest: 'uploads/' });

const videoOutputDir = path.join(__dirname, 'assets', 'video');
if (!fs.existsSync(videoOutputDir)) {
  fs.mkdirSync(videoOutputDir, { recursive: true });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), (req, res) => {
  const imageFile = req.files['image'][0];
  const audioFile = req.files['audio'][0];

  const outputFilename = `simple-${Date.now()}.mp4`;
  const videoPath = path.join(videoOutputDir, outputFilename);

  ffmpeg()
    .input(imageFile.path)
    .loop()
    .input(audioFile.path)
    .outputOptions([
      '-c:v libx264',
      '-tune stillimage',
      '-c:a aac',
      '-b:a 192k',
      '-pix_fmt yuv420p',
      '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2',
      '-shortest'
    ])
    .on('end', () => {
      // cleanup temp files
      fs.unlinkSync(imageFile.path);
      fs.unlinkSync(audioFile.path);
      res.download(videoPath, outputFilename);
    })
    .on('error', err => {
      console.error('FFmpeg Error:', err.message);
      if (fs.existsSync(imageFile.path)) fs.unlinkSync(imageFile.path);
      if (fs.existsSync(audioFile.path)) fs.unlinkSync(audioFile.path);
      res.status(500).send('Error generating video: ' + err.message);
    })
    .save(videoPath);
});

const server = app.listen(0, () => {
  console.log(`Server started! Open your browser at: http://localhost:${server.address().port}`);
});
