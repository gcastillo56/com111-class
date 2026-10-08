# Modular Express Routing, Protected Chains & Browser Client Testing

## 🎯 Lab Overview & Objectives
In this closing session on Express backend architecture, you will transition from a single-file monolithic server into a modular, enterprise-grade directory structure. You will split endpoint definitions across isolated router files using `express.Router()` and enforce security protocols via **middleware method chaining**.

By the end of this lab, you will be able to:
1. **Modularize Backend Routing:** Isolate resource controllers into dedicated modules under a `/routes` directory.
2. **Apply Method Chaining:** Use Express's `router.route()` pattern to chain multiple HTTP verbs (`.get()`, `.post()`, `.delete()`) and security middlewares cleanly on identical URI paths.
3. **Implement Route Protection Middleware:** Intercept incoming requests to verify authorization headers before granting access to protected handlers.
4. **Test Endpoints via a Client Web Page:** Use a lightweight HTML/JS frontend to issue asynchronous `fetch()` calls with authorization headers and display dynamic JSON responses without relying on Postman.

---

## 📂 Project Directory Structure

```text
sustainhub-modular-api/
├── package.json
├── server.js                  # Main server setup & middleware mounting
├── utils/
│   └── appError.js            # Custom error class
├── middlewares/
│   └── authMiddleware.js      # Protection & role-authorization middlewares
│   └── errorMiddleware.js     # Error handling middlewares
├── routes/
│   ├── authRoutes.js          # Router for /api/auth
│   └── apiRoutes.js           # Router for /api/ (Method Chaining)
└── public/
    └── index.html             # Client-side testing interface (Thin JS Fetch)
```

---


### Scenario
You are refactoring the **SustainHub Climate API**. The project has outgrown a single `server.js` file. Your team leader has tasked you with:
1. Extracting authorization and initiative endpoints into separate router files using `express.Router()`.
2. Safeguard climate data by chaining a `protect` middleware to verify incoming `Authorization: Bearer <token>` headers.
3. Restricting destructive actions (like `DELETE /api/initiatives/:id`) using a chained `requireAdmin` middleware.
4. Testing all endpoints directly from a browser interface using a provided `public/index.html` file that makes `fetch()` requests and renders returned JSON payloads.
