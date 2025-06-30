# PostPilot AI Hub - Backend

This is the backend service for the PostPilot AI Hub application, built with Node.js, Express, and Supabase.

## Project Structure

```
backend/
├── database/
│   ├── config.ts           # Database configuration
│   ├── migrations/         # Database migration files
│   └── scripts/            # Database utility scripts
├── src/
│   ├── api/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript type definitions
│   │   └── validators/     # Request validation
│   └── index.ts            # Application entry point
├── .env.example           # Example environment variables
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your Supabase credentials

### Environment Variables

```env
# Server
PORT=5001
NODE_ENV=development

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
```

### Running the Server

- Development:
  ```bash
  npm run dev
  ```

- Production:
  ```bash
  npm run build
  npm start
  ```

### Database Migrations

To run database migrations:

```bash
npm run migrate
```

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh-token` - Refresh access token

### Error Handling

All error responses follow this format:

```json
{
  "status": "error",
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Deployment

### Docker

Build the Docker image:

```bash
docker build -t postpilot-ai-hub-backend .
```

Run the container:

```bash
docker run -p 5001:5001 --env-file .env postpilot-ai-hub-backend
```

## License

MIT
