require('dotenv').load();
const TelegramBot = require('node-telegram-bot-api');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

function banAndKick(chatId, userId, msgId) {
  bot.kickChatMember(chatId, userId);
  bot.sendMessage(chatId, `👮️ Removed some spam and smashed the banhammer. Move along.`)
  bot.deleteMessage(chatId, msgId);
}

bot.onText(/u.to\//, (msg, match) => {
  const chatId = msg.chat.id;

  console.log(`Spam message: ${msg.text}`)
  banAndKick(chatId, msg.from.id, msg.message_id)
})

// Listen for any kind of message
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.forward_from_chat) {
    console.log(`Forwareded message: ${msg.text}`)

    if (msg.entities[0].url) {
      console.log(`Message has a link: ${msg.text}`);
      banAndKick(chatId, msg.from.id, msg.message_id)
    }
  }
  
  if (msg.text.match(/t.cn\//g)) {
    console.log(`Spam message: ${msg.text}`)
    banAndKick(chatId, msg.from.id, msg.message_id)
  }

  if (msg.text.match(/t.me\/bitcoin/g)) {
    console.log(`Spam message: ${msg.text}`)
    banAndKick(chatId, msg.from.id, msg.message_id)
  }
  
  if (msg.text.match(/using my link/g)) {
    console.log(`Spam message: ${msg.text}`)
    banAndKick(chatId, msg.from.id, msg.message_id)
  }
});
