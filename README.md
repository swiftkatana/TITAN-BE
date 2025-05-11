# Quotes App Backend

This backend service is built with **Node.js**, **Express**, and **TypeScript**. It integrates with the [FavQs API](https://favqs.com/api/) to retrieve inspirational quotes, applying caching, retry logic, and conditional rate limiting to improve performance and reliability.

---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the `backend` directory:

```env
FAVQS_API_KEY=your_favqs_token
PORT=3001
```

### 3. Run the Server

```bash
# Development with hot reload
npm run dev

# Production
npm run build && npm start
```

---

## 📌 API Endpoint

### `GET /quotes`

Returns a full page of quotes from the FavQs API.

#### Query Parameters:

* `page` (number, required): Page number to fetch from FavQs
* `tag` (string, optional): Filter by quote tag (e.g. `life`, `success`)

#### Example:

```
GET http://localhost:3001/quotes?page=3&tag=inspirational
```

#### Behavior:

* If the page is cached, it is returned immediately and does **not** count against the rate limit.
* If not cached, it fetches from the FavQs API with retries and stores the result in memory.

---

## ✅ Features

* 🔁 Retry logic on failed API requests (up to 3 times)
* 💾 In-memory caching with `node-cache`
* 🔐 Conditional rate limiter (using `express-rate-limit`)
* 🔎 Tag filtering and page navigation support

---

## 📁 Folder Structure

```
backend/
├── src/
│   ├── controllers/       # Handles HTTP requests
│   ├── routes/            # Express routes
│   ├── services/          # API logic and caching
│   ├── types/             # Shared TypeScript interfaces
│   └── server.ts          # App entry point
```

---

## 🧪 Scripts

```json
"scripts": {
  "dev": "ts-node-dev --respawn src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

## 🛠 Technologies Used

* Node.js
* Express.js
* TypeScript
* Axios
* NodeCache
* express-rate-limit

---

## 📄 License

MIT
