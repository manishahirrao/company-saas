# PostPilot AI Hub

A comprehensive solution for managing AI-generated content with subscription and credit-based access.

## Project Structure

```
.
├── backend/         # Node.js backend server
├── frontend/        # React frontend application
└── package.json     # Root package.json for managing both frontend and backend
```

## Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- PostgreSQL (for backend)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd postpilot-ai-hub
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
   cd ../backend && npm install
   cd ..
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in both `frontend` and `backend` directories
   - Update the environment variables with your configuration

4. **Start the development servers**
   ```bash
   # Start both frontend and backend in development mode
   npm run dev
   ```
   - Frontend will be available at: http://localhost:3000
   - Backend API will be available at: http://localhost:5001

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm start` - Start both frontend and backend in production mode
- `npm run build` - Build both frontend and backend for production
- `npm test` - Run tests for both frontend and backend
- `npm run lint` - Lint both frontend and backend code
- `npm run format` - Format code using Prettier

## Development

### Frontend
- Built with React, TypeScript, and Vite
- UI components using Radix UI and Tailwind CSS
- State management with React Context API

### Backend
- Built with Node.js, Express, and TypeScript
- Database: PostgreSQL with TypeORM
- Authentication: JWT
- API Documentation: Swagger/OpenAPI

## Deployment

### Frontend
- The frontend can be deployed to Vercel, Netlify, or any static hosting service.

### Backend
- The backend can be deployed to any Node.js hosting service (e.g., Heroku, Railway, or a VPS).

## License

[MIT](LICENSE)
