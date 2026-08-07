# Perplexity

Perplexity is a full-stack AI chat application with a React frontend and an Express/Node.js backend. It supports user authentication, protected chat sessions, real-time messaging, and AI-generated responses with optional web search capabilities.

## Features

- User registration and login with JWT-based authentication
- Protected dashboard for chat conversations
- Real-time messaging with Socket.IO
- AI response generation using LangChain integrations
- Optional internet search support for richer answers
- MongoDB-backed storage for users, chats, and messages
- Email-based notifications for account-related actions

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, Tailwind CSS, Socket.IO client
- Backend: Node.js, Express, MongoDB with Mongoose, Socket.IO, JWT, Nodemailer
- AI services: Google Gemini, Mistral, and Tavily integrations

## Project Structure

- Backend/: server, API routes, controllers, models, services, and socket setup
- Frontend/: React app, Redux slices, pages, hooks, and API/socket clients

## Prerequisites

- Node.js 18 or newer
- npm
- A running MongoDB instance
- API credentials for the AI and email services you plan to use

## Environment Variables

Create a .env file inside the Backend folder with values similar to the following:

```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/perplexity
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
MISTRAL_API_KEY=your_mistral_key
TAVILY_API_KEY=your_tavily_key
GOOGLE_USER=your_email@gmail.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

## Getting Started

1. Install backend dependencies:
   ```bash
   cd Backend
   npm install
   ```

2. Start the backend server:
   ```bash
   npm run dev
   ```

3. In a second terminal, install and start the frontend:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

4. Open the frontend in your browser at http://localhost:5173 and the backend API at http://localhost:8000.

## Notes

- The frontend and backend are separated by design, so they should be started independently.
- Keep secrets out of source control by relying on environment variables and the ignore files added in both folders.
