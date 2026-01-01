// ===============================
// 仙人tools server.js（完全版）
// 起動: node server.js
// ===============================

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------------------------------------
// 1. 静的ファイル配信
//    chat/public の JS / CSS も配信される
// --------------------------------------------------
app.use(express.static(__dirname));

// chat 専用 public
app.use("/chat", express.static(path.join(__dirname, "chat/public")));

// proxy 配下もそのまま静的
app.use("/proxy", express.static(path.join(__dirname, "proxy")));

// --------------------------------------------------
// 2. EJS 設定（music 用）
// --------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "music/views"));

// --------------------------------------------------
// 3. ホーム
// --------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// --------------------------------------------------
// 4. chat
//    /chat → chat/public/index.html
// --------------------------------------------------
app.get("/chat/", (req, res) => {
  const filePath = path.join(__dirname, "chat", "public", "index.html");

  if (!fs.existsSync(filePath)) {
    res.status(404).send("chat not found");
    return;
  }

  res.sendFile(filePath);
});

// --------------------------------------------------
// 5. music
//    /music → music/views/index.ejs
// --------------------------------------------------
app.get("/music/", (req, res) => {
  const ejsPath = path.join(__dirname, "music", "views", "index.ejs");

  if (!fs.existsSync(ejsPath)) {
    res.status(404).send("music not found");
    return;
  }

  // 今は変数なしでそのまま描画
  res.render("index");
});

// --------------------------------------------------
// 6. proxy
// --------------------------------------------------
app.get("/proxy/", (req, res) => {
  const filePath = path.join(__dirname, "proxy", "index.html");

  if (!fs.existsSync(filePath)) {
    res.status(404).send("proxy not found");
    return;
  }

  res.sendFile(filePath);
});

// --------------------------------------------------
// 7. 404
// --------------------------------------------------
app.use((req, res) => {
  res.status(404).send("not found");
});

// --------------------------------------------------
// 8. 起動
// --------------------------------------------------
app.listen(PORT, () => {
  console.log("====================================");
  console.log("仙人tools server running");
  console.log("PORT:", PORT);
  console.log("====================================");
});
