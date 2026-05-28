# Real-Time Collaborative Whiteboard

A modern full-stack whiteboard application for teams that want to draw, discuss, and collaborate in real time. Users can create boards, invite teammates, manage access, draw together on a shared canvas, and chat inside the same workspace.

The frontend is built with React, Tailwind CSS, and Konva.js. It connects to a Spring Boot backend that handles authentication, board management, permissions, chat, and WebSocket-based synchronization.

## Live Demo Links

| Service | Link |
| --- | --- |
| Frontend | [https://real-time-whiteboard-pearl.vercel.app/](https://real-time-whiteboard-pearl.vercel.app/) |
| Backend | [https://real-time-whiteboard-backend-1.onrender.com](https://real-time-whiteboard-backend-1.onrender.com) |

## GitHub Repository Links

| Repository | Link |
| --- | --- |
| Frontend | [https://github.com/ksaini-web/real-time-whiteboard](https://github.com/ksaini-web/real-time-whiteboard) |
| Backend | [https://github.com/ksaini-web/real-time-whiteboard-backend.git](https://github.com/ksaini-web/real-time-whiteboard-backend.git) |

## Features

- Real-time drawing collaboration across multiple users
- In-board chat for active team discussions
- JWT-based authentication
- Role-based board access
- Owner-controlled invitations and permissions
- Editor and Viewer collaboration modes
- Undo and redo support for drawing actions
- Chat enable/disable control for board owners
- Responsive UI for desktop and tablet screens
- WebSocket/STOMP integration for live updates
- Canvas drawing powered by Konva.js

## User Roles

### Owner

Owners have full control over their boards.

- Create boards
- Invite users
- Manage user permissions
- Enable or disable chat
- Draw, edit, and collaborate in real time

### Editor

Editors can actively contribute to the whiteboard.

- Draw and edit shapes
- Collaborate with other users in real time
- Send and receive chat messages

### Viewer

Viewers can follow the board activity without changing drawings.

- View board activity live
- Participate in chat
- Cannot draw or edit shapes

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| React.js | Frontend UI |
| Vite | Development server and build tool |
| Tailwind CSS | Styling and responsive layout |
| Konva.js / React Konva | Canvas drawing |
| STOMP.js | WebSocket messaging client |
| SockJS | WebSocket fallback support |
| Axios | API requests |
| React Router | Client-side routing |
| Vercel | Frontend deployment |

### Backend

| Technology | Purpose |
| --- | --- |
| Spring Boot | REST API and application backend |
| Spring Security | Authentication and authorization |
| JWT | Secure stateless authentication |
| WebSocket/STOMP | Real-time drawing and chat updates |
| MySQL | Database |
| Render | Backend deployment |

## Screenshots

Add project screenshots in this section to show the main user flows.

### Login Page

![Login Page](https://placehold.co/1200x700?text=Login+Page)

### Signup Page

![Signup Page](https://placehold.co/1200x700?text=Signup+Page)

### Dashboard

![Dashboard](https://placehold.co/1200x700?text=Dashboard)

### Whiteboard

![Whiteboard](https://placehold.co/1200x700?text=Whiteboard)

### Chat System

![Chat System](https://placehold.co/1200x700?text=Chat+System)

### Invitation System

![Invitation System](https://placehold.co/1200x700?text=Invitation+System)

## Installation Steps

Before running the frontend locally, make sure the following tools are installed:

- Node.js 18 or higher
- npm
- Git
- A running instance of the backend server

Clone the frontend repository:

```bash
git clone https://github.com/ksaini-web/real-time-whiteboard.git
cd real-time-whiteboard
```

Install dependencies:

```bash
npm install
```

## Frontend Setup

Create a local environment file:

```powershell
New-Item -ItemType File .env
```

Add the backend API URL:

```env
VITE_BACKEND_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Backend Requirement

This frontend requires the Spring Boot backend to be running for authentication, board APIs, permissions, chat, and real-time drawing synchronization.

Backend repository:

```text
https://github.com/ksaini-web/real-time-whiteboard-backend.git
```

For local development, run the backend on:

```text
http://localhost:8080
```

The backend should provide:

- User signup and login APIs
- JWT authentication
- Board creation and management APIs
- Invitation and permission APIs
- Shape storage APIs
- WebSocket/STOMP endpoints
- MySQL database connection

## WebSocket Integration

The application uses WebSocket communication with STOMP to keep every connected user in sync.

When a user draws, updates, or deletes a shape, the frontend sends the action to the backend through a STOMP destination. The backend then broadcasts the update to other users connected to the same board.

Chat messages follow the same real-time flow, so users can discuss ideas without leaving the whiteboard.

Typical real-time events include:

- Shape created
- Shape updated
- Shape deleted
- Undo or redo action
- Chat message sent
- Board chat enabled or disabled

Main WebSocket routes used by the frontend:

| Purpose | Route |
| --- | --- |
| WebSocket endpoint | `/ws` |
| Send drawing updates | `/app/draw` |
| Receive drawing updates | `/topic/shapes` |
| Send chat messages | `/app/chat` |
| Receive global chat messages | `/topic/chat` |
| Receive board chat messages | `/topic/board/{boardId}/chat` |

## Problem Statement

Remote teams often need a simple space where they can brainstorm visually and communicate at the same time. Many whiteboard tools are either too limited, too expensive, or difficult to customize for a specific workflow.

Real-Time Collaborative Whiteboard solves this by providing a full-stack collaborative workspace with authentication, access control, real-time drawing, chat, and board management in one project.

## Future Improvements

- Export boards as PNG or PDF
- Add sticky notes and text annotations
- Show live user cursors
- Add board templates
- Improve mobile touch drawing
- Add board activity history
- Add OAuth login with Google or GitHub
- Add more advanced shape styling options
- Add notifications for board invitations

## Author Section

**Kartik Saini**

- GitHub: [@ksaini-web](https://github.com/ksaini-web)
- Frontend Demo: [https://real-time-whiteboard-pearl.vercel.app/](https://real-time-whiteboard-pearl.vercel.app/)
- Backend Demo: [https://real-time-whiteboard-backend-1.onrender.com](https://real-time-whiteboard-backend-1.onrender.com)
