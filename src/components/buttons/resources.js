module.exports = {
  data: {
    name: `resources`,
  },
  async execute(interaction, client) {
    await interaction.edit.message({
      content: `bla bla`
    });
  }
}