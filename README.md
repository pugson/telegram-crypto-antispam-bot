# telegram-crypto-antispam-bot
👮️ Ban all these annoying spammers from your public Telegram groups.

## What does this bot do?
Currently it checks if there has been a forwarded message with any link entity, removes the message, and bans the user that sent it.
It does the same thing when it matches a mention of `t.me/bitcoin`.

## How to use
1. Create a Telegram bot by speaking to [@BotFather](https://t.me/botfather).
2. Clone this repo.
3. Run `yarn install`
4. Create a `.env` file with the token you received from _BotFather_:
```
TOKEN='pasteyourtokenhere'
```
5. Start it with `node index.js`
