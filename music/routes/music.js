const express = require("express");
const router = express.Router();
const scdl = require('soundcloud-downloader').default;

router.get('/', (req, res) => {
  res.render('home', { tracks: [], query: '' });
});

router.get('/s', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.redirect('/music');

  const r = await scdl.search({ query, resourceType: 'tracks' });
  const tracks = r.collection.slice(0, 10).map(t => ({
    id: t.id,
    title: t.title,
    username: t.user.username,
    artwork_url: t.artwork_url?.replace('-large', '-t500x500')
      || 'https://via.placeholder.com/500'
  }));

  res.render('home', { tracks, query });
});

router.get('/f', (req, res) => {
  res.render('home', { tracks: [], query: '__FAVORITES__' });
});

module.exports = router;
