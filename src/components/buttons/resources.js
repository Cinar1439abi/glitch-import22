module.exports = {
  data: {
    name: `resources`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `bla bla`
    });
  }
}