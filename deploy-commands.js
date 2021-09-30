require('dotenv').config();
const SlashCommandBuilder = require('@discordjs/builders').SlashCommandBuilder;
const REST = require('@discordjs/rest').REST;
const Routes = require('discord-api-types/v9').Routes;

// store the environmental variables
const token = process.env.BOT_TOKEN;
const bot_id = process.env.BOT_ID;
const guild_id = process.env.SERVER_ID;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('gen_qr').setDescription('Generates QR code from text'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(bot_id, guild_id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
    