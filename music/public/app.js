// ===============================
// 仙人music app.js（完全版）
// ===============================

// -------------------------------
// 再生処理
// -------------------------------
function playTrack(id, title, artwork) {
  // 現在再生中の曲を保存
  localStorage.setItem(
    "currentTrack",
    JSON.stringify({
      id: id,
      title: title,
      artwork: artwork
    })
  );

  // プレイヤーUI更新
  const titleEl = document.getElementById("player-title");
  const frameEl = document.getElementById("player-frame");
  const barEl = document.getElementById("player-bar");

  if (!titleEl || !frameEl || !barEl) {
    console.error("player elements not found");
    return;
  }

  titleEl.textContent = title;

  frameEl.src =
    "https://w.soundcloud.com/player/?url=" +
    encodeURIComponent("https://api.soundcloud.com/tracks/" + id) +
    "&auto_play=true";

  barEl.classList.remove("hidden");
}

// -------------------------------
// お気に入り切り替え
// -------------------------------
function toggleFavorite(artwork_url, title, id) {
  let favorites = [];

  try {
    favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  } catch (e) {
    favorites = [];
  }

  const index = favorites.findIndex(t => t.id === id);

  if (index === -1) {
    favorites.push({
      artwork_url: artwork_url,
      title: title,
      id: id
    });
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// -------------------------------
// お気に入り一覧表示
// -------------------------------
function showFavorites() {
  let list = [];

  try {
    list = JSON.parse(localStorage.getItem("favorites")) || [];
  } catch (e) {
    list = [];
  }

  const content = document.getElementById("content");
  if (!content) {
    console.error("content element not found");
    return;
  }

  content.innerHTML = "";

  if (!list.length) {
    content.innerHTML =
      '<p class="text-center text-gray-500">お気に入りなし</p>';
    return;
  }

  list.forEach(track => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded-2xl shadow flex gap-4 items-center";

    // アートワーク
    const img = document.createElement("img");
    img.src = track.artwork_url;
    img.className = "w-20 h-20 rounded-xl object-cover";

    // タイトル
    const title = document.createElement("div");
    title.className = "flex-1 font-bold";
    title.textContent = track.title;

    // 再生ボタン
    const playBtn = document.createElement("button");
    playBtn.className =
      "bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full transition";
    playBtn.textContent = "▶";
    playBtn.onclick = () => {
      playTrack(track.id, track.title, track.artwork_url);
    };

    // お気に入り解除ボタン
    const favBtn = document.createElement("button");
    favBtn.className = "text-2xl";
    favBtn.textContent = "❤️";
    favBtn.onclick = () => {
      toggleFavorite(track.artwork_url, track.title, track.id);
      showFavorites();
    };

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(playBtn);
    card.appendChild(favBtn);

    content.appendChild(card);
  });
}

// -------------------------------
// ページ読み込み時に再生復元
// -------------------------------
(function restorePlayer() {
  let track = null;

  try {
    track = JSON.parse(localStorage.getItem("currentTrack"));
  } catch (e) {
    track = null;
  }

  if (track && track.id && track.title && track.artwork) {
    playTrack(track.id, track.title, track.artwork);
  }
})();
