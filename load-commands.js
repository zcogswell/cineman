const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
  loadCommands,
};

function loadCommands() {
  const commands = new Collection();
  const commandsDir = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsDir);
  for (const commandFile of commandFiles) {
    if (commandFile.endsWith('.js')) {
      const filePath = path.join(commandsDir, commandFile);
      const command = require(filePath);
      if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
      }
      else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
    else {
      const commandsSubDir = path.join(commandsDir, commandFile);
      if (fs.statSync(commandsSubDir).isDirectory()) {
        const subCommandFiles = fs.readdirSync(commandsSubDir).filter(file => file.endsWith('.js'));
        for (const subCommand of subCommandFiles) {
          const filePath = path.join(commandsSubDir, subCommand);
          const command = require(filePath);
          if ('data' in command && 'execute' in command) {
            commands.set(command.data.name, command);
          }
          else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
          }
        }
      }
    }
  }
  return commands;
}
