import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

let stompClient = null;
let currentMessageHandler = null;

export function connectSocket(onMessageReceived) {
  currentMessageHandler = onMessageReceived;

  if (stompClient && stompClient.active) return;

  stompClient = new Client({
    webSocketFactory: () => new SockJS(`${BASE}/ws`),
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("WebSocket Connected");

      stompClient.subscribe("/topic/shapes", (message) => {
        console.log("Received shape raw:", message.body);
        const shape = JSON.parse(message.body);
        currentMessageHandler?.(shape);
      });

      stompClient.subscribe("/topic/chat", (message) => {
        console.log("Received chat raw:", message.body);
        const chat = JSON.parse(message.body);
        currentMessageHandler?.(chat);
      });
    },
  });

  stompClient.activate();
}

export function subscribeBoardChat(boardId, onMessageReceived) {
  if (!stompClient || !stompClient.connected || !boardId) return null;
  return stompClient.subscribe(`/topic/board/${boardId}/chat`, (message) => {
    const chat = JSON.parse(message.body);
    onMessageReceived(chat);
  });
}

export function sendShape(shape) {
  console.log("Sending socket shape:", shape);
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/draw",
      body: JSON.stringify(shape),
    });
  } else {
    console.log("Socket not connected");
  }
}

export function sendChatMessage(message) {
  console.log("Sending chat message:", message);
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify(message),
    });
  } else {
    console.log("Socket not connected");
  }
}