# 🖼️ Image + Audio → Video Generator

A simple Node.js application that lets you upload an image and an audio file, then stitches them together into an MP4 video using **FFmpeg**.  
It also auto‑assigns a free port for the server, so you can run multiple instances without conflicts.

---

## 🚀 Features
- Upload an image (`.jpg`, `.png`) and audio (`.mp3`, `.wav`) via a web form.
- Generate a video where the image loops until the audio ends.
- Encodes with **H.264 video** and **AAC audio** for wide compatibility.
- Auto‑scales image dimensions to even values (required by FFmpeg).
- Cleans up temporary upload files after processing.
- Downloads the generated video directly from the browser.
- Runs on a random available port (`app.listen(0)`).

---

## 📦 Requirements
- Node.js (v16+ recommended)
- npm
- FFmpeg (bundled via `ffmpeg-static`)

---

## 🔧 Installation

# Install dependencies
npm install
```

---

## ▶️ Usage
1. Start the server:
   ```bash
   node index.js
   ```
   You’ll see something like:
   ```
   Server started! Open your browser at: http://localhost:54321
   ```

2. Open the URL in your browser.  
3. Upload an image + audio file.  
4. Download the generated video once processing completes.

---

## 📂 Project Structure
```
├── assets/
│   ├── video/        # Generated videos
│   └── images/       # (Optional) watermark/logo files
├── uploads/          # Temporary uploads
├── index.html        # Upload form
├── server.js         # Express + FFmpeg logic
└── README.md
```

---

## ⚠️ Notes
- The server uses `app.listen(0)` → OS auto‑assigns a free port.  
- If you want a fixed port, replace `0` with your desired port number (e.g., `3000`).  
- To restrict to a **range of ports**, add custom logic (e.g., try ports 4000–4100 until one is free).  
- For watermarking, you can extend the FFmpeg command with `-vf "overlay=..."`.

---

## 📜 License
MIT License — free to use, modify, and share.

---
