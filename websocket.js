const WebSocket = require('ws');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });
  wss.on("error", (e) => console.error(e));
  wss.on('connection', (ws) => {
    ws.on("message", () => {
      console.info("demande d'update reçu");
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send("update pls");
        }
      });
    });
    ws.on('close', () => console.log('Client déconnecté'));
    ws.on("error", (e) => console.error(e));
  });
}