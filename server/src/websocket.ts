import { WebSocketServer } from 'ws';
import http from 'http';
import { clearMessagesFile, saveMessageToFile } from './storage/filestore';

const sampleEvents = [
  'New user signed up',
  'Stock price updated',
  'Sensor triggered',
  'Chat message received',
];

function getRandomEvent() {
  const index = Math.floor(Math.random() * sampleEvents.length);
  return {
    type: 'event',
    message: sampleEvents[index],
    timestamp: new Date().toISOString(),
  };
}

export function setupWebSocket(server: http.Server) {
  const wss = new WebSocketServer({ server });
  let broadcastTimeout: NodeJS.Timeout | null = null;
  let broadcasting = false;

  function broadcastRandomEvent() {
    const event = getRandomEvent();

    console.log({ event });
    saveMessageToFile(event);

    wss.clients.forEach((client: any) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(event));
      }
    });

    const delay = Math.floor(Math.random() * 5000) + 5000;
    broadcastTimeout = setTimeout(broadcastRandomEvent, delay);
  }

  function startBroadcast() {
    if (!broadcasting) {
      broadcasting = true;
      console.log('Starting broadcast loop');
      broadcastRandomEvent();
    }
  }

  function stopBroadcast() {
    if (broadcastTimeout) {
      clearTimeout(broadcastTimeout);
      broadcastTimeout = null;
      broadcasting = false;
      console.log('Broadcast loop stopped');
    }
  }

  wss.on('connection', (ws: any) => {
    console.log('Client connected');

    ws.send(
      JSON.stringify({
        type: 'status',
        message: 'Connected to WebSocket server',
      }),
    );

    // Start broadcast when first client connects
    if (wss.clients.size === 1) {
      startBroadcast();
    }

    ws.on('message', (data: any) => {
      const received = data.toString();
      console.log('Received from client:', received);

      if (received === 'stop') {
        stopBroadcast();
      }
      if (received === 'start') {
        startBroadcast();
      }
    });

    ws.on('close', async () => {
      console.log('Client disconnected');

      if (wss.clients.size === 0) {
        console.log('No clients connected, clearing messages file');
        await clearMessagesFile();
        stopBroadcast();
      }
    });
  });

  // Do NOT start broadcasting here automatically,
  // instead start when first client connects or 'start' command received

  return wss;
}
