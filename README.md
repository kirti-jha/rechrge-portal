# LPay MERN Scaffold

LPay now includes:

- a React + Vite frontend
- an Express backend scaffold
- a Mongo-ready `User` model for `admin` and `retailor`
- hierarchy APIs for loading and creating downline retailors
- a memory fallback so the API can still run before MongoDB is connected

## Project Structure

- `src/` - React frontend
- `server/src/` - Express backend
- `server/src/models/User.js` - Mongo user model
- `server/src/routes/hierarchyRoutes.js` - hierarchy API routes
- `server/src/services/hierarchyStore.js` - Mongo or memory-backed hierarchy storage

## Frontend Scripts

- `npm run dev` - start Vite frontend
- `npm run build` - production build
- `npm run server:dev` - start Express backend in dev mode
- `npm run server:start` - start Express backend in normal mode

## Backend Environment

Create `server/.env` from `server/.env.example`.

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lpay
CLIENT_ORIGIN=http://127.0.0.1:4173
ALLOW_MEMORY_FALLBACK=true
```

## Current API

- `GET /api/health`
- `GET /api/hierarchy`
- `POST /api/hierarchy/users`

`POST /api/hierarchy/users` body:

```json
{
  "creatorId": "admin-or-retailor-id",
  "name": "New Retailor",
  "code": "RTL-301",
  "charges": {
    "mobile": 2.5,
    "dth": 4,
    "pan": 10
  }
}
```

## MERN Flow

1. Start MongoDB locally or provide a hosted `MONGO_URI`.
2. Install backend dependencies inside `server/`.
3. Run the backend on port `5000`.
4. Run the frontend on port `4173` or Vite default.
5. The frontend will use `/api/hierarchy` through the Vite proxy.

## Important Note

The repo now contains the MERN structure, but backend packages still need to be installed before the Express server can run:

```bash
cd server
npm install
```

If MongoDB is not available, the backend can still run in memory mode when `ALLOW_MEMORY_FALLBACK=true`.
