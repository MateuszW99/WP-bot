const { Client, Intents, Collection } = require('discord.js');
const { token, mainChannelId, successChannelId } = require('./config.json');
const { createNiceMessage } = require('./niceMessageBuilder.js');
const Discord = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async msg => {
    if (msg.channelId === successChannelId) {
        client.channels.cache.get(mainChannelId).send(createNiceMessage(msg.author.toString()));
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
    console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(token);