const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gamestore')
    .setDescription('Shows Game Store')
    .setDMPermission(false),
  async execute(interaction, client) {
    const button = new ButtonBuilder()
    .setCustomId('gamestore')
    .setLabel('Game Store')
    .setStyle(ButtonStyle.Primary);

    await interaction.edit.message({
      components: [new ActionRowBuilder().addComponents(button)]
    });
  },
};