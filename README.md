# MC RCON for Firebot

## How to use

1. Download the latest **mcRcon.js** file from [Releases](https://github.com/ebiggz/firebot-script-minecraft-rcon/releases)
2. Add the **mcRcon.js** as a startup script in Firebot (_Settings_ > _Advanced_ > _Startup Scripts_)
3. Restart Firebot
4. Add a **Send Minecraft RCON Command** effect to anything you want

## MC Server Setup

- Ensure the server has RCON enabled in _server.properties_ (`enable-rcon=true`)
- Make sure you set a RCON password in _server.properties_ (`rcon.password=SecurePasswordHere`)

## Developers

### Setup

1. Clone or fork repo
2. `npm install`

### Building

- `npm run build` - outputs the .js file to the `/dist` folder
- `npm run build:dev` - outputs the .js file and copies it to Firebot's script folder`
