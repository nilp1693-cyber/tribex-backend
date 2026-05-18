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

  if (!url) return res.status(400).json({ error: "URL required" });

  res.json({
    title: "Direct File Preview",
    url,
    thumbnail: "https://via.placeholder.com/480x270.png?text=TRIBEX+Preview",
    qualities: [
      { label: "Original File", type: "MP4" }
    ]
  });
});

app.get("/api/download", (req, res) => {
  const fileUrl = req.query.url;

  if (!fileUrl) {
    return res.status(400).send("File URL required");
  }

  if (!fileUrl.startsWith("http://") && !fileUrl.startsWith("https://")) {
    return res.status(400).send("Invalid URL");
  }

  const client = fileUrl.startsWith("https://") ? https : http;

  res.setHeader("Content-Disposition", "attachment; filename=tribex-video.mp4");

  client.get(fileUrl, (fileRes) => {
    if (fileRes.statusCode !== 200) {
      return res.status(400).send("File not found or blocked");
    }

    fileRes.pipe(res);
  }).on("error", () => {
    res.status(500).send("Download failed");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TRIBEX Backend running on port ${PORT}`);
});
