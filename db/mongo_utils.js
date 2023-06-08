const { connect, model } = require('mongoose');
const { movie, user } = require('./schema');

module.exports = {
  suggest_movie,
};

async function suggest_movie(omdb_movie) {
  await connect(process.env.MONGODB_ADDRESS);
  const Movie = model('Movie', movie);
  const submission = new Movie();
  await console.log(submission.find({ imdbid: omdb_movie.imdbid }));
}

suggest_movie({ imdbid: 'tt5311514' });
