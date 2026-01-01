const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイルを全部そのまま配信
app.use(express.static(__dirname));

// ホーム
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// /chat /music /proxy
app.get("/:section/", (req, res) => {
  const section = req.params.section;
  const filePath = path.join(__dirname, section, "index.html");
  res.sendFile(filePath, err => {
    if (err) res.status(404).send("not found");
  });
});

app.listen(PORT, () => {
  console.log("仙人tools running on port", PORT);
});
