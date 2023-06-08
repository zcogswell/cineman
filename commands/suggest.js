const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const omdb = new (require('omdbapi'))(process.env.OMDB_API_KEY);

const MOVIES_TO_PRINT = 5;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Suggests a movie for movie night.')
    .addStringOption(option =>
      option.setName('movie')
        .setDescription('Movie to suggest (IDMb link or title)')
        .setRequired(true)),
  async execute(interaction) {
    const query = interaction.options.getString('movie');
    if (query.search('imdb.com') > -1) {
      const imdbid = query.replace('https://www.imdb.com/title/', '').replace('/', '');
      omdb.get({ id: imdbid })
        .then((res) => interaction.reply(`*${res.title}* (${res.year}) suggested by ${interaction.user}`))
        .catch((error) => interaction.reply(error.message));
    }
    else {
      omdb.search({ search: query })
        .then((res) => interaction.reply(printable_movie_list(res)))
        .catch((error) => interaction.reply(error.message));
    }
  },
};

function printable_movie_list(movies) {
  let res = '';
  for (const i in movies) {
    if (i >= MOVIES_TO_PRINT) {
      break;
    }
    res += `${i}. *${movies[i].title}* (${movies[i].year})\n`;
  }
  return res;
}
