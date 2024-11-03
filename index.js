const { Client, GatewayIntentBits } = require('discord.js');
const token = require('./token.json');

console.log(token.tokenId);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    // Add other necessary intents here
  ],
});

client.on('messageCreate', (message)=>{
    console.log(message.content);
    if(!message?.author?.bot){
        message.reply('Mera NAam HI SHinchan hai');
    }
    
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', (interaction) => {
    interaction.reply('Pong!!!');
})

//login based on token
//client.login(token.tokenId);