const { SlashCommandBuilder } = require('@discordjs/builders');

const prayers =  
"Travisie Boży, stróżu mój,\n" +
"Ty zawsze przy mnie stój.\n" +
"Rano, wieczór, we dnie, w dropie\n" +
"Bądź mi zawsze ku pomocy,\n" +
"Strzeż dropu, ea mego,\n" +
"zaprowadź mnie do riselu wiecznego.\n" +
"Amen.";

module.exports = {
    data: new SlashCommandBuilder().setName('modlitwa').setDescription('Pomódl się do Travisa'),
    async execute(interaction) {
        await interaction.reply(prayers);
    },
};