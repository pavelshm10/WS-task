import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';

const app = express();
const PORT = 4000;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sampleEvents = [
  "New user signed up",
  "Stock price updated",
  "Sensor triggered",
  "Chat message received",
];

function getRandomEvent() {
  const index = Math.floor(Math.random() * sampleEvents.length);
  return {
    type: "event",
    message: sampleEvents[index],
    timestamp: new Date().toISOString(),
  };
}

function broadcastRandomEvent() {
  const event = getRandomEvent();
  wss.clients.forEach((client:any) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(event));
    }
  });

  const delay = Math.floor(Math.random() * 5000) + 5000; // 5–10 seconds
  setTimeout(broadcastRandomEvent, delay);
}

// Handle connections
wss.on('connection', (ws:any) => {
  console.log('Client connected');

  ws.send(JSON.stringify({
    type: "status",
    message: "Connected to WebSocket server",
  }));

  ws.on('message', (data:any) => {
    console.log("Received from client:", data.toString());
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start emitting events
broadcastRandomEvent();

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
