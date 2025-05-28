import React, { useEffect, useRef, useState } from "react";
import {
  setConnectionStatus,
  setWebSocketActive,
} from "../store/reducers/connectionSlice";
import { addEvent, clearEvents } from "../store/reducers/eventsSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { ConnectionStatus } from "../types/connection";
function NotificationList() {
  const dispatch = useAppDispatch();
  const { status, isWebSocketActive } = useAppSelector(
    (state) => state.connection
  );
  const events = useAppSelector((state) => state.events.events);
  const ws = useRef<WebSocket | null>(null);
  const [command, setCommand] = useState(""); // For sending commands/messages

  useEffect(() => {
    if (!isWebSocketActive) return;

    dispatch(setConnectionStatus(ConnectionStatus.CONNECTING));
    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onopen = () => {
      dispatch(setConnectionStatus(ConnectionStatus.CONNECTED));
    };

    ws.current.onclose = () => {
      dispatch(setConnectionStatus(ConnectionStatus.DISCONNECTED));
    };

    ws.current.onerror = () => {
      dispatch(setConnectionStatus(ConnectionStatus.DISCONNECTED));
    };

    ws.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        const eventText = data.event || data.message || "Unknown event";
        const timestamp = data.timestamp || new Date().toISOString();

        dispatch(addEvent({ event: eventText, timestamp }));
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [dispatch, isWebSocketActive]);

  // Function to send command back to server
  const sendCommand = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const msg = JSON.stringify({ command }); // You can customize the command structure
      ws.current.send(msg);
      setCommand(""); // clear input after sending
    } else {
      alert("WebSocket is not connected.");
    }
  };

  const handleClearEvents = () => {
    dispatch(clearEvents());
  };

  const handleStopWebSocket = () => {
    dispatch(setWebSocketActive(false));
    dispatch(setConnectionStatus(ConnectionStatus.DISCONNECTED));
    ws.current?.close();
  };

  const handleStartWebSocket = () => {
    dispatch(setWebSocketActive(true));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>
        Status: {status === ConnectionStatus.CONNECTED && "🟢 Connected"}
        {status === ConnectionStatus.CONNECTING && "🟡 Connecting"}
        {status === ConnectionStatus.DISCONNECTED && "🔴 Disconnected"}
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", height: "2rem" }}>
          {!isWebSocketActive && (
            <button onClick={handleStartWebSocket}>Start WebSocket</button>
          )}
          <button onClick={handleClearEvents}>Clear Events</button>
          <button onClick={handleStopWebSocket} disabled={!isWebSocketActive}>
            Stop WebSocket
          </button>
        </div>
        {/* Command input & send button */}
        <div style={{ display: "flex", gap: "1rem", height: "2rem" }}>
          <input
            type="text"
            className="text-input"
            value={command}
            placeholder="Type command or message"
            onChange={(e) => setCommand(e.target.value)}
            disabled={!isWebSocketActive}
          />
          <button
            onClick={sendCommand}
            disabled={!command || !isWebSocketActive}
          >
            Send Command
          </button>
        </div>
      </div>

      <ul>
        {events.map((e, i) => (
          <li key={i}>
            <strong>{e.timestamp}:</strong> {e.event}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationList;
