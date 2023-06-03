const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge-channel')
    .setDescription('Purges last 100 messages in this channel.'),
  async execute(interaction) {
    await interaction.channel.bulkDelete(100);
  },
};
