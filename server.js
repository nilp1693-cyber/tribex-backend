const express = require("express");
const cors = require("cors");
const https = require("https");
const http = require("http");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TRIBEX Backend is running ✅");
});

app.post("/api/info", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  res.json({
    title: "TRIBEX Video Preview",
    url: url,
    thumbnail: "https://via.placeholder.com/480x270.png?text=TRIBEX+Preview",
    qualities: [
      { label: "144p", type: "MP4" },
      { label: "240p", type: "MP4" },
      { label: "360p", type: "MP4" },
      { label: "480p", type: "MP4" },
      { label: "720p HD", type: "MP4" },
      { label: "1080p Full HD", type: "MP4" },
      { label: "1440p 2K", type: "WEBM" },
      { label: "2160p 4K", type: "WEBM" },
      { label: "128kbps Audio", type: "MP3" },
      { label: "256kbps Music", type: "M4A" }
    ]
  });
});

app.get("/api/download", (req, res) => {
  const fileUrl = req.query.url;

  if (!fileUrl) {
    return res.status(400).send("File URL required");
  }

  if (!fileUrl.startsWith("http://") && !fileUrl.startsWith("https://")) {
    return res.status(400).send("Invalid file URL");
  }

  const client = fileUrl.startsWith("https://") ? https : http;

  client.get(fileUrl, (fileRes) => {
    if (fileRes.statusCode !== 200) {
      return res.status(400).send("File not found or blocked");
    }

    res.setHeader("Content-Disposition", "attachment; filename=tribex-video.mp4");
    res.setHeader("Content-Type", "video/mp4");

    fileRes.pipe(res);
  }).on("error", () => {
    res.status(500).send("Download failed");
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`TRIBEX Backend running on port ${PORT}`);
});
