const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temporary folder for uploads

// Ensure the output directory exists
const videoOutputDir = path.join(__dirname, 'assets', 'video');
if (!fs.existsSync(videoOutputDir)) {
  fs.mkdirSync(videoOutputDir, { recursive: true });
}

// Simple HTML Interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Generation Endpoint
app.post('/generate', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), (req, res) => {
  const imageFile = req.files['image'][0];
  const audioFile = req.files['audio'][0];

  const watermarkPath = path.join(__dirname, 'assets', 'images', 'ldlogo.jpg');
  const outputFilename = `panchangam-${Date.now()}.mp4`;
  const videoPath = path.join(videoOutputDir, outputFilename);

  ffmpeg()
    .input(imageFile.path)
    .loop()
    .input(audioFile.path)
    .input(watermarkPath)
    .complexFilter([
      // Scale the background image to even dimensions (required by libx264)
      {
        filter: 'scale', options: 'trunc(iw/2)*2:trunc(ih/2)*2',
        inputs: '[0:v]', outputs: 'bg'
      },
      // Overlay the watermark (input 2) on the scaled background (bg)
      // Positioned at bottom-right with 20px padding
      {
        filter: 'overlay', options: 'x=main_w-W-20:y=main_h-H-20',
        inputs: ['bg', '2:v'], outputs: 'outv'
      }
    ], 'outv')
    .outputOptions([
      '-c:v libx264',
      '-tune stillimage',
      '-c:a aac',
      '-b:a 192k',
      '-pix_fmt yuv420p',
      '-shortest'
    ])
    .on('end', () => {
      // Cleanup uploaded temp files
      fs.unlinkSync(imageFile.path);
      fs.unlinkSync(audioFile.path);

      // Send file for download
      res.download(videoPath, outputFilename);
    })
    .on('error', err => {
      // Cleanup uploaded temp files on error to prevent storage leaks
      if (fs.existsSync(imageFile.path)) fs.unlinkSync(imageFile.path);
      if (fs.existsSync(audioFile.path)) fs.unlinkSync(audioFile.path);

      console.error('FFmpeg Error:', err.message);
      res.status(500).send('Error generating video: ' + err.message);
    })
    .save(videoPath);
});

const server = app.listen(0, () => {
  console.log(`Server started! Open your browser at: http://localhost:${server.address().port}`);
});