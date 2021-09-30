require('dotenv').config();

const { channel } = require('diagnostics_channel');
// require the necessary discord classes
const { MessageEmbed, Client, Intents } = require('discord.js');

// require the environmental variables
const token = process.env.BOT_TOKEN;

// Create a new instance of clients
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

// message handlers

client.once('ready', ()=>{
    console.log(`Logged in as ${client.user.tag}`)
})

// handler for generate function

client.on('messageCreate', message=>{
    if(message.author.id == client.user.id){
        return;
    }

    // split the message using
    const args = message.content.split(' ');
    // store the command
    const cmd = args[0];
    // store data portion of message
    let data = args.splice(1);
    data = data.join('+');

    //url
    if(data.length != 0){
        const url = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${data}`;
        if(cmd === '_generate'){
            const embed = new MessageEmbed()
                .setColor('DARK_GREY')
                .setDescription('This is the code you generated')
                .setURL(url)
                .setImage(url);

                message.reply({embeds: [embed]});
        }
    }else{
        message.reply('PLease enter valid data with the command');
    }
 
})

client.login(token);
