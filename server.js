const app = require("express")();
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = require("http").Server(app);
  const io = require("socket.io")(server);

  io.on("connect", (socket) => {
    socket.emit("now", {
      message: "zeit",
    });
  });

  app.get("*", (req, res) => {
    return nextHandle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
