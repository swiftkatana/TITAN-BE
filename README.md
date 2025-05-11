# Quotes App Backend

This is the backend server for the Quotes App, built with Express and TypeScript. It fetches quotes from the FavQs API, applies retry and caching logic, and exposes a single `/quotes` endpoint.

---

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Add Environment Variables
Create a `.env` file:
```
FAVQS_API_KEY=your_favqs_api_key_here
PORT=3001
```

### 3. Run the Server
For development with auto-reload:
```bash
npm run dev
```
For production:
```bash
npm run build && npm start
```

---

## 📌 Endpoint

### `GET /quotes`
Fetches quotes from the FavQs API.

#### Query Parameters
- `count` (required): Number of quotes to fetch (1–50)
- `tag` (optional): Filter quotes by a specific tag

#### Example
```
GET http://localhost:3001/quotes?count=5&tag=life
```

---

## ✅ Features
- Rate-limited using `express-rate-limit`
- In-memory caching via `node-cache`
- Retry logic with exponential backoff on API errors
- Fallback quotes in case of API failure
- Input sanitization and edge case handling

---

## 🛠 Technologies
- Node.js + Express
- TypeScript
- Axios
- dotenv
- node-cache
- express-rate-limit

---

## 📁 Folder Structure
```
backend/
├── src/
│   ├── controllers/       # Express handlers
│   ├── routes/            # Route definitions
│   ├── services/          # External API + caching
│   ├── types/             # Shared interfaces
│   └── server.ts          # App entry point
```

---

## ⚙️ Scripts
```json
"scripts": {
  "dev": "ts-node-dev --respawn src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

## 📄 License
MIT
