const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("tested")
    .setDMPermission(false),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Test`)
      .setDescription("Test")
      .setColor(0x18e1ee);
  },
};
