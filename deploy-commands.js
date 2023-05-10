const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const { loadCommands } = require('./load-commands');

const commands = loadCommands();
console.log('Commands' + commands);
const commandsJson = [];
for (const command of commands.values()) {
  commandsJson.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commandsJson },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  }
  catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
