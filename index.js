require('dotenv').load();
const TelegramBot = require('node-telegram-bot-api');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  function banAndKick() {
    bot.kickChatMember(chatId, msg.from.id);
    bot.sendMessage(chatId, `👮️ Removed some spam and smashed the banhammer. Move along.`)
    bot.deleteMessage(chatId, msg.message_id);
  }

  // send a message to the chat acknowledging receipt of their message
  if (msg.forward_from_chat) {
    console.log(`Forwareded message: ${msg.text}`)

    if (msg.entities[0].url) {
      console.log(`Message has a link: ${msg.text}`);
      banAndKick();
    }
  }

  if (msg.text.match(/t.me\/bitcoin/g)) {
    console.log(`Spam message: ${msg.text}`)
    banAndKick();
  }
});