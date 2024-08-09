const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SharedSlashCommandSubcommands, CommandInteractionOptionResolver } = require('discord.js');
const fs = require('fs');

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync('./src/commands');9
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(command.data.name + "has passed through the handler")
      }
    }

    const clientID = '1269632975587250280';
    const guildID = '1055164488444764180';
    const rest = new REST({ version: '9' }).setToken(process.env.token);
    try {
      console.log("Started refreshing application (/) commands.");
      console.log(client.commandArray);

      await rest.put(Routes.applicationCommands(clientID, guildID), {
        body: client.commandArray,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
}