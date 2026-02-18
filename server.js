import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: "uploads/" });
const VIDEO_DB = "videos.json";

if (!fs.existsSync(VIDEO_DB)) {
  fs.writeFileSync(VIDEO_DB, JSON.stringify([]));
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/videos", (req, res) => {
  const data = JSON.parse(fs.readFileSync(VIDEO_DB));
  res.json(data);
});

app.post("/upload", upload.single("video"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "Aucune vidéo reçue" });

  const videos = JSON.parse(fs.readFileSync(VIDEO_DB));

  const newVideo = {
    id: Date.now(),
    filename: file.filename,
    originalName: file.originalname,
    url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
  };

  videos.push(newVideo);
  fs.writeFileSync(VIDEO_DB, JSON.stringify(videos));

  res.json({ success: true, video: newVideo });
});

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log("Serveur ClassHub lancé sur le port " + PORT);
});
