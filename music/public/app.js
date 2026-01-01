function playTrack(id, title, artwork) {
  localStorage.setItem('currentTrack', JSON.stringify({ id, title, artwork }));
  document.getElementById('player-title').textContent = title;
  document.getElementById('player-frame').src =
    `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&auto_play=true`;
  document.getElementById('player-bar').classList.remove('hidden');
}

function toggleFavorite(artwork_url, title, id) {
  let f = JSON.parse(localStorage.getItem('favorites')) || [];
  const i = f.findIndex(t => t.id === id);
  if (i === -1) f.push({ artwork_url, title, id });
  else f.splice(i, 1);
  localStorage.setItem('favorites', JSON.stringify(f));
}

function showFavorites() {
  const list = JSON.parse(localStorage.getItem('favorites')) || [];
  const c = document.getElementById('content');
  c.innerHTML = '';

  if (!list.length) {
    c.innerHTML = '<p class="text-center text-gray-500">お気に入りなし</p>';
    return;
  }

  list.forEach(t => {
    const d = document.createElement('div');
    d.className = 'bg-white p-4 rounded-2xl shadow flex gap-4 items-center';
    d.innerHTML = `
      <img src="${t.artwork_url}" class="w-20 h-20 rounded-xl">
      <div class="flex-1 font-bold">${t.title}</div>
      <button class="bg-blue-500 text-white w-12 h-12 rounded-full">▶</button>
      <button class="text-2xl">❤️</button>
    `;
    d.children[2].onclick = () => playTrack(t.id, t.title, t.artwork_url);
    d.children[3].onclick = () => toggleFavorite(t.artwork_url, t.title, t.id);
    c.appendChild(d);
  });
}

(function restorePlayer() {
  const t = JSON.parse(localStorage.getItem('currentTrack'));
  if (t) playTrack(t.id, t.title, t.artwork);
})();
