// ===================================
// 仙人tools server.js（最終完全版）
// ===================================

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// -----------------------------------
// 1. 静的ファイル設定
// -----------------------------------

// ルート直下（index.html 用）
app.use(express.static(__dirname));

// chat の JS / CSS 用
app.use("/chat", express.static(path.join(__dirname, "chat/public")));

// music の JS / CSS 用（← 重要）
app.use("/music", express.static(path.join(__dirname, "music/public")));

// proxy
app.use("/proxy", express.static(path.join(__dirname, "proxy")));

// -----------------------------------
// 2. EJS 設定（music 用）
// -----------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "music/views"));

// -----------------------------------
// 3. ホーム
// -----------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// -----------------------------------
// 4. chat
// -----------------------------------
app.get("/chat/", (req, res) => {
  const filePath = path.join(__dirname, "chat/public/index.html");

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("chat not found");
  }

  res.sendFile(filePath);
});

// -----------------------------------
// 5. music
// -----------------------------------
app.get("/music/", (req, res) => {
  const ejsPath = path.join(__dirname, "music/views/index.ejs");

  if (!fs.existsSync(ejsPath)) {
    return res.status(404).send("music not found");
  }

  // index.ejs を描画
  res.render("index");
});

// -----------------------------------
// 6. proxy
// -----------------------------------
app.get("/proxy/", (req, res) => {
  const filePath = path.join(__dirname, "proxy/index.html");

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("proxy not found");
  }

  res.sendFile(filePath);
});

// -----------------------------------
// 7. 404
// -----------------------------------
app.use((req, res) => {
  res.status(404).send("not found");
});

// -----------------------------------
// 8. 起動
// -----------------------------------
app.listen(PORT, () => {
  console.log("====================================");
  console.log("仙人tools server running");
  console.log("PORT:", PORT);
  console.log("====================================");
});
