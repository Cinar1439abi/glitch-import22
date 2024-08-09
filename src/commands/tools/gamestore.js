const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collector, EmbedBuilder, Embed, CustomEmoji } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gamestore')
    .setDescription('Shows Game Store')
    .setDMPermission(false),
  async execute(interaction, client) {
    epheremal = true;
    // Create the initial embed
    const initialEmbed = new EmbedBuilder()
      .setTitle('Welcome to the Game Store!')
      .setDescription('Please select a category from the buttons below.')
      .setColor(0xfee75c);
    const firstButton = new ButtonBuilder()
      .setCustomId('gamestore')
      .setLabel('Resources')
      .setEmoji('<:stones:1271195175368134767>')
      .setStyle(ButtonStyle.Primary);

    const secondButton = new ButtonBuilder()
      .setCustomId('test')
      .setLabel('Electronic')
      .setEmoji('⚡')
      .setStyle(ButtonStyle.Primary);

    const thirdButton = new ButtonBuilder()
      .setCustomId('es')
      .setLabel('.')
      .setEmoji('🗡️')
      .setStyle(ButtonStyle.Primary);

    const fourthButton = new ButtonBuilder()
      .setCustomId('tt')
      .setLabel('.')
      .setStyle(ButtonStyle.Primary);

    const fifthButton = new ButtonBuilder()
      .setCustomId('tet')
      .setLabel('.')
      .setStyle(ButtonStyle.Primary);

    const response = await interaction.reply({
      embeds: [initialEmbed], // Send the initial embed
      components: [new ActionRowBuilder().addComponents(firstButton, secondButton, thirdButton, fourthButton, fifthButton)],
      fetchReply: true,
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    const collector = response.createMessageComponentCollector({
      filter: collectorFilter,
      time: 30_000, //time to wait in milliseconds
    });

    collector.on('collect', async (buttonInteraction) => {
      // Function to handle button clicks
      function handleButtonClick(customId) { 
        switch (customId) {
          case 'gamestore':
            return new EmbedBuilder()
              .setTitle('__Resources__')
              .setDescription('**-25k** <:woodddd:1271147212004524132> **= 500 <:scrapp:1271196412830420992>**\n**-10k <:stones:1271195175368134767> = 500 <:scrapp:1271196412830420992>**\n**-5k <:metall:1271195062029778964> = 500 <:scrapp:1271196412830420992>**\n**-200 <:hqm:1271195112826994829> = 500 <:scrapp:1271196412830420992>**\n**-3k <:lowgrade:1271194997802270722> = 500 <:scrapp:1271196412830420992>**')
              .setColor(0xfee75c);
          case 'test':
            return new EmbedBuilder()
              .setTitle('Electronic')
              .setDescription('This is the Electronic category. More information here.')
              .setColor(0xfee75c);
          case 'es':
            return new EmbedBuilder()
              .setTitle('ES')
              .setDescription('This is the ES category. More information here.')
              .setColor(0xfee75c);
          case 'tt':
            return new EmbedBuilder()
              .setTitle('TT')
              .setDescription('This is the TT category. More information here.')
              .setColor(0xfee75c);
          case 'tet':
            return new EmbedBuilder()
              .setTitle('TET')
              .setDescription('This is the TET category. More information here.')
              .setColor(0xfee75c);
          default:
            return new EmbedBuilder()
              .setTitle('Invalid Button')
              .setDescription('Please select a valid button.')
              .setColor(0xfee75c);
        }
      }

      // Update the message based on the clicked button with embeds
      await buttonInteraction.update({ // Use buttonInteraction
        embeds: [handleButtonClick(buttonInteraction.customId)], // Send an array of embeds
    });
    })

    collector.on('end', collected => {
      console.log(`Collected ${collected.size} interactions.`);
    });
  },
};