import { WebSocketServer } from "ws";
import http from "http";

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

function broadcastRandomEvent(wss: WebSocketServer) {
  const event = getRandomEvent();
  wss.clients.forEach((client: any) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(event));
    }
  });

  const delay = Math.floor(Math.random() * 5000) + 5000; // 5–10 seconds
  setTimeout(() => broadcastRandomEvent(wss), delay);
}

export function setupWebSocket(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: any) => {
    console.log("Client connected");

    ws.send(
      JSON.stringify({
        type: "status",
        message: "Connected to WebSocket server",
      })
    );

    ws.on("message", (data: any) => {
      console.log("Received from client:", data.toString());
      // Optionally, you can handle incoming messages here
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  // Start emitting events
  broadcastRandomEvent(wss);

  return wss; // optionally return wss if you want to use it elsewhere
}
