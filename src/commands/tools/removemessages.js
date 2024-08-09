const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delmessages')
    .setDescription('Deletes a specified number of messages from the current channel.')
    .addIntegerOption(option => 
      option.setName('amount')
        .setDescription('The number of messages to delete')
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    
    if (amount > 100) {
      await interaction.reply('You can only delete up to 100 messages at a time.');
      return;
    }

    const messages = await interaction.channel.messages.fetch({ limit: amount });

    try {
      await interaction.channel.bulkDelete(messages, true);
      await interaction.reply(`Successfully deleted ${amount} messages.`);
    } catch (error) {
      console.error('Error deleting messages:', error);
      await interaction.reply('An error occurred while deleting messages.');
    }
  },
};