const express = require("express");
const cors = require("cors");

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
    title: "Demo Video",
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
      { label: "2160p 4K Ultra HD", type: "WEBM" },
      { label: "128kbps Audio", type: "MP3" },
      { label: "256kbps Music", type: "M4A" }
    ]
  });
});

app.get("/api/download", (req, res) => {
  res.status(400).send("Demo backend only. Real download file URL/API needed.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TRIBEX Backend running on port ${PORT}`);
});
