# Real-Time Chat App

A full-stack real-time chat application built with React, Express, MongoDB, and Socket.io. Users can sign up, log in, create chat rooms, and exchange messages in real time. The app supports online/offline status, typing indicators, and user authentication.

## Features
- User authentication (signup/login)
- Create and join chat rooms
- Real-time messaging with Socket.io
- Online/offline user status
- Typing indicators
- Room-based message history
- Responsive UI with Tailwind CSS

## overview

<img width="191" height="100" alt="Screenshot from 2025-07-13 21-56-38" src="https://github.com/user-attachments/assets/d8300678-782a-4de7-b030-dd1095b1ecda" />
<img width="191" height="100" alt="Screenshot from 2025-07-13 21-56-27" src="https://github.com/user-attachments/assets/930016b0-e67c-49e9-81b0-5f34867af943" />
<img width="191" height="100" alt="Screenshot from 2025-07-13 21-55-27" src="https://github.com/user-attachments/assets/4ce970c4-96b8-4471-bbf0-0740d44988b2" />

## Tech Stack
- **Frontend:** React, Tailwind CSS, socket.io-client
- **Backend:** Node.js, Express, Socket.io, Mongoose (MongoDB)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- pnpm or npm

### Installation

#### 1. Clone the repository
```bash
git clone <repo-url>
cd week-5-web-sockets-assignment-AmanT776
```

#### 2. Install dependencies
- For the backend:
  cd server
  pnpm install # or npm install
- For the frontend:
  cd client
  pnpm install # or npm install

#### 3. Set up environment variables
- In `server/.env`, set:
  ```env
  MONGO_URI=mongodb://localhost:27017/chatapp
  JWT_SECRET=your_jwt_secret
  PORT=7000
  ```

#### 4. Start the servers
- Start MongoDB if running locally.
- In the `server` directory:
  pnpm start # or npm start
- In the `client` directory:
  pnpm run dev # or npm run dev
- Frontend will run at [http://localhost:5173](http://localhost:5173)
- Backend will run at [http://localhost:7000](http://localhost:7000)

## Usage
1. Sign up for a new account or log in.
2. Create a new chat room or join an existing one.
3. Start chatting in real time!
4. Open multiple browser windows to test real-time features.

## Project Structure
```
week-5-web-sockets-assignment-AmanT776/
├── client/      # React frontend
├── server/      # Express backend
└── README.md
```

## Troubleshooting
- Ensure MongoDB is running and accessible.
- Make sure you install all dependencies in both `client` and `server`.
- If you see CORS or socket connection errors, check that both servers are running and CORS is configured.
- For JWT decoding, ensure `jwt-decode` is installed in the client.

