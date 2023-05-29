const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const omdb = new (require('omdbapi'))(process.env.OMDB_API_KEY);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Suggests a movie for movie night.')
    .addStringOption(option =>
      option.setName('movie')
        .setDescription('Movie to suggest (title, IMDB link, OMDb link)')
        .setRequired(true)),
  async execute(interaction) {
    const query = interaction.options.getString('movie');
    if (query.search('imdb.com') > -1) {
      const imdbID = query.replace('https://www.imdb.com/title/', '').replace('/', '');
      omdb.get({ id: imdbID })
        .then((res) => interaction.reply(`*${res.title}* (${res.year})`))
        .catch((error) => interaction.reply(error.message));
    }
    else {
      omdb.search({ search: query })
        .then((res) => interaction.reply(String(res)))
        .catch((error) => interaction.reply(error.message));
    }
  },
};
