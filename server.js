const app = require("express")();
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();

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

    io.emit("some event", {
      connect: "true",
      list: listIP,
    });

    socket.on("disconnect", function () {
      console.log("Got disconnect!");

      ip ? listIP.pop(ip) : console.log("Belum connect");
      console.log(listIP);

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
