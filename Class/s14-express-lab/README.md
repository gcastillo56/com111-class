## SustainHub Climate Action API
You are tasked with building the backend API engine for **SustainHub**, an environmental monitoring platform. The frontend team needs stateless server endpoints to query climate scientists, filter telemetry metrics by department, and register new environmental initiatives.

---

### Step 1: Initialize Project & Install Express
Open your terminal inside your project workspace directory and run:

```bash
# Initialize a new npm package
npm init -y

# Install Express.js
npm install express
```

Open `package.json` and add `"type": "module"` so we can use modern ES6 `import` statements:

```json
{
  "name": "sustainhub-api",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

---

### Step 2: Parameter Mechanisms Explained

When clients talk to your Express server, they can send data in three distinct ways:

| Mechanism | Express Access | Primary Use Case | Example Request |
| :--- | :--- | :--- | :--- |
| **Route Params** | `req.params` | Identifying a specific resource by unique ID | `GET /api/scientists/42` |
| **Query Params** | `req.query` | Filtering, sorting, or searching collections | `GET /api/scientists?dept=climate&active=true` |
| **Request Body** | `req.body` | Submitting complex data structures (creating/updating) | `POST /api/initiatives` + JSON payload |

> ⚠️ **CRITICAL:** Express **cannot read JSON request bodies by default**! You MUST mount the `express.json()` built-in middleware before your routes:
> ```javascript
> app.use(express.json());
> ```

---

### BASE CODE

```javascript
import express from 'express';

const app = express();
const PORT = 3000;

// ==========================================
// 1. MIDDLEWARE CONFIGURATION
// ==========================================
// TODO: Mount built-in JSON body parser middleware (app.use(express.json()))


// Mock In-Memory Database
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

// ==========================================
// 2. ROUTES & ENDPOINTS
// ==========================================

// 2a. HTML Root Landing Route
// TODO: Create GET '/' endpoint returning a basic HTML status heading string using res.send()


// 2b. GET All Scientists with Query Filtering (req.query)
// TODO: Create GET '/api/scientists' endpoint
// - If req.query.dept is provided, filter scientists by department
// - Return JSON response with status 200: res.json(...)


// 2c. GET Single Scientist by ID (req.params)
// TODO: Create GET '/api/scientists/:id' endpoint
// - Parse req.params.id as an integer
// - Find scientist matching ID
// - Return 404 JSON error if not found, or 200 JSON object if found


// 2d. POST Create New Initiative (req.body)
// TODO: Create POST '/api/initiatives' endpoint
// - Extract title, budget, and department from req.body
// - Validate fields (return 400 JSON error if missing)
// - Create new initiative object, push to array
// - Return 201 Created JSON response


// ==========================================
// 3. SERVER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 SustainHub API Server running at http://localhost:${PORT}`);
});
```

---

## Step 3: Integration & Testing Guide

Once your server is running (`node server.js`), open **Postman** to test each endpoint:

### Test Case 1: GET Root HTML Landing Page
* **Method:** `GET`
* **URL:** `http://localhost:3000/`
* **Expected Result:** Status `200 OK`, HTML preview rendered in Postman response tab.

### Test Case 2: GET All Scientists (JSON)
* **Method:** `GET`
* **URL:** `http://localhost:3000/api/scientists`
* **Expected Result:** Status `200 OK`, JSON payload containing array of 3 scientists.

### Test Case 3: GET Filtered Scientists via Query Parameter
* **Method:** `GET`
* **URL:** `http://localhost:3000/api/scientists?dept=Climate`
* **Expected Result:** Status `200 OK`, filtered array containing 2 climate scientists.

### Test Case 4: GET Single Scientist via Route Parameter
* **Method:** `GET`
* **URL:** `http://localhost:3000/api/scientists/2`
* **Expected Result:** Status `200 OK`, scientist object for "Prof. Marcus Vance".
* *Try invalid ID:* `http://localhost:3000/api/scientists/99` ➜ Expected Status `404 Not Found` with JSON error.

### Test Case 5: POST Create Initiative via Request Body
* **Method:** `POST`
* **URL:** `http://localhost:3000/api/initiatives`
* **Headers:** Key `Content-Type` ➜ Value `application/json`
* **Body:** Select **raw** ➜ **JSON**, and paste:
  ```json
  {
    "title": "Solar Canopy Grid Phase 1",
    "budget": 45000,
    "department": "Climate"
  }
  ```
* **Expected Result:** Status `201 Created`, JSON payload returning created object with assigned ID.

---