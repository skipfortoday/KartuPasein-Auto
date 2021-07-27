const app = require("express")();
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();
process.env.NTBA_FIX_319 = 1;

const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = "1826120694:AAHgzuV5PM_gCxQ6jNJTjMZW4Mi6rDEKW2k";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  // send a message to the chat acknowledging receipt of their message
});

nextApp.prepare().then(() => {
  const server = require("http").Server(app);
  const io = require("socket.io")(server);
  let listIP = [];

  io.on("connect", (socket) => {
    console.log(socket.conn.remoteAddress);
    const ip =
      socket.handshake.headers["x-forwarded-for"] ||
      socket.conn.remoteAddress.split(":")[3];

    ip ? listIP.push(ip) : console.log("Belum connect");
    console.log(listIP);
    bot.sendMessage("@lvnotify", `${ip} Telah Connect`);
    io.emit("some event", {
      connect: "true",
      list: listIP,
    });

    socket.on("disconnect", function () {
      console.log("Got disconnect!");

      ip ? listIP.pop(ip) : console.log("Belum connect");
      console.log(listIP);
      bot.sendMessage("@lvnotify", `${ip} Telah Disconnect`);

      io.emit("some event", {
        connect: "true",
        list: listIP,
      });
    });
  });

  app.get("*", (req, res) => {
    return nextHandle(req, res);
  });

  app.post("*", (req, res) => {
    return nextHandle(req, res);
  });

  app.put("*", (req, res) => {
    return nextHandle(req, res);
  });

  app.patch("*", (req, res) => {
    return nextHandle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
