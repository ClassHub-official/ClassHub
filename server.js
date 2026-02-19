import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const VIDEO_DB = "./videos.json";
const UPLOADS = "./uploads";

if (!fs.existsSync(UPLOADS)) fs.mkdirSync(UPLOADS);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Charger vidéos
app.get("/videos", (req, res) => {
  const videos = JSON.parse(fs.readFileSync(VIDEO_DB));
  res.json(videos);
});

// Upload vidéo
app.post("/upload", upload.single("video"), (req, res) => {
  const videos = JSON.parse(fs.readFileSync(VIDEO_DB));

  const newVideo = {
    id: Date.now(),
    filename: req.file.filename,
    url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
    creator: req.body.creator || "Inconnu",
    likes: 0,
    views: 0,
    comments: []
  };

  videos.push(newVideo);
  fs.writeFileSync(VIDEO_DB, JSON.stringify(videos));

  res.json({ success: true, video: newVideo });
});

// Like vidéo
app.post("/like/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const videos = JSON.parse(fs.readFileSync(VIDEO_DB));

  const v = videos.find(x => x.id === id);
  if (!v) return res.status(404).json({ error: "Vidéo introuvable" });

  v.likes++;
  fs.writeFileSync(VIDEO_DB, JSON.stringify(videos));

  res.json({ success: true, likes: v.likes });
});

// Vue vidéo
app.post("/view/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const videos = JSON.parse(fs.readFileSync(VIDEO_DB));

  const v = videos.find(x => x.id === id);
  if (!v) return res.status(404).json({ error: "Vidéo introuvable" });

  v.views++;
  fs.writeFileSync(VIDEO_DB, JSON.stringify(videos));

  res.json({ success: true, views: v.views });
});

// Commentaire
app.post("/comment/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;

  const videos = JSON.parse(fs.readFileSync(VIDEO_DB));
  const v = videos.find(x => x.id === id);

  if (!v) return res.status(404).json({ error: "Vidéo introuvable" });

  v.comments.push({ author, text, date: Date.now() });
  fs.writeFileSync(VIDEO_DB, JSON.stringify(videos));

  res.json({ success: true, comments: v.comments });
});

// Supprimer vidéo
app.delete("/video/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let videos = JSON.parse(fs.readFileSync(VIDEO_DB));

  const v = videos.find(x => x.id === id);
  if (!v) return res.status(404).json({ error: "Vidéo introuvable" });

  const filePath = path.join(UPLOADS, v.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  videos = videos.filter(x => x.id !== id);
  fs.writeFileSync(VIDEO_DB, JSON.stringify(videos));

  res.json({ success: true });
});

// Servir les fichiers uploadés
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Serveur ClassHub lancé sur le port " + PORT));
