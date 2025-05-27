const WebSocket = require('ws');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log("client connected");
    ws.send(JSON.stringify({ type: 'welcome', message: 'Bienvenue via WebSocket !' }));
    // ws.on('updateHp', () => {
    //   console.log('update reçu');
    //   wss.clients.forEach((client) => {
    //     if (client.readyState === WebSocket.OPEN) {
    //       client.send(`Echo: update reçu`);
    //     }
    //   });
    // });

    ws.on('close', () => {
      console.log('Client déconnecté');
    });
  });
}