const { Schema } = require('mongoose');

module.exports = {
  movie,
  user,
};

const movie = new Schema({
  imdbid: String,
  title: String,
  year: Number,
  first_suggester: String,
  last_suggester: String,
  first_suggest_date: { type: Date, default: Date.now },
  last_suggest_date: { type: Date, default: Date.now },
  wins: Number,
  last_win: { type: Date, default: null },
});

const user = new Schema({
  discord_id: String,
  search_results: [{ imdb_id: String }],
});
