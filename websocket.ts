import { IncomingMessage, Server, ServerResponse } from 'http';
import { WebSocketServer } from 'ws';

const websocket = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log("client connected");
    ws.send(JSON.stringify({
      type: 'welcome',
      message: 'Bienvenue via WebSocket !'
    }));

    ws.on('close', () => {
      console.log('Client déconnecté');
    });
  });
};

export default websocket;
